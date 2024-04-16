//===================================================
// Fabrice Menoyot - 2024
//====================================================
// Definir variables GLOBALE 
var LISTEEquipes = new Array();
var LISTETables = new Array();
var LISTEPartie = new Array();
var TOTALRESULTATS = 0;
var TESTMODE = false;
var sortDown = false;
var showHelp = true;
var PARTIEEnCours = 0;
var NOUVELLEPARTIE = false;
var SECTIONEnCours = "INTRO-1-SECTION";
var myFontSize = 1;
var myPartieFontSize = 1.4;
var introNum = 1;
var revientOu = "";
var AIDEactive = false;
// Keep data in memory bteween functions
var dataEnCours = "";
var equipeInMemoire = 0;
var myUFOS = shuffleUFOs();
var skipUFO = false;
var mySectionsList = ["INTRO-1-SECTION", "INTRO-2-SECTION", "INTRO-3-SECTION", "INSCRIPTION-SECTION", "PARTIE-SECTION", "SCORES-SECTION", "FIN-SECTION", "MANAGE-SECTION", "AUTEUR-SECTION", "TOOL-EXPORT"];

/*
$("#INSCRIPTION-GAUCHE").addClass('rotateOnObject').one('animationend', function() {
    $(this).removeClass('rotateOnObject');
});

*/
//======================================================
function loadApp() {
	cacheTout();
	createToolBar();
	createToolBarPROJ();
	// Build SCORES PARTIE radio btns
	createStarsBox();
	// Récupère les donnée en Local Storage
	$("#ECRAN-CONTAINER").hide();
	window.moveTo(0, 0);
   window.resizeTo(screen.width, screen.height);
           
	checkTournoiExist();// et puis commence
}

//=========================================
function goToSection(sectionName) {
	cacheTout();
	$(".toolBtnBar").hide();
	// garde en mémoire où on est
	SECTIONEnCours = sectionName;
	switch (sectionName) {
		case 'INTRO-SECTION':
			$("#ECRAN-CONTAINER").show();
			if (introNum > 3) {
				goToSection('INSCRIPTION-SECTION');
			} else {
				$('#salut').empty().append(returnHello());
				$("#INTRO-1-TEXT").hide();
				$("#INTRO-2-TEXT").hide();
				$("#INTRO-3-TEXT").hide();
				if (introNum < 2) {
					$("#INTRO-SECTION").show();
				}
				$("#INTRO-" + introNum + "-TEXT").show();
				if (introNum >= 3) {
					$("#TEST-TOURNOI").show();
				}
				introNum++;
				$("#AUTEUR-btn").show();
				$("#PROJECTEUR-btn").show();
				$("#DOWNLOAD-btn").show();
				$("#TOOLS-btn").show();
				
			}
			break;
		case 'INSCRIPTION-SECTION':
			$("#INTRO-SECTION").hide();
			initiateBaseTournoi();
			sortDescendingTeam();
			$("#SETTINGS-btn").show();
			$("#INSCRIPTION-SECTION").show();
			$("#newTeamName").focus();
			break;
		case 'PARTIE-SECTION':
			if (PARTIEEnCours == 0) {
				PARTIEEnCours = 1;
				NOUVELLEPARTIE = true;
				generateTables(TESTMODE);
			}
			if (PARTIEEnCours > 1 ) { showHelp = false; }
			TESTMODE = false;
			showMyHelp();
			afficheTable(PARTIEEnCours);
			afficheTableProj(PARTIEEnCours);
			$("#saveScorePartie").hide();
			$("#saveScorePartieOFF").hide();
			$('#scoreEquipeA').prop('readonly', true);
			$('#myScoresPartieCover').show();
			$('#myScoresPartie').hide();
			RADIOBTNSP_Load(PARTIEEnCours);
			reprendrePartie();
			$("#CONTINUE-btn").show();
			$("#CONTINUE-btn").data("action", "PARTIE-START");
			$(".hideProj").hide();
			$("#TABLEAU-CONTAINER-PROJ").show();
			$("#ECRAN-CONTAINER").hide();
			$("#ECRAN-PROJECTEUR").show();
			break;
		case 'SCORES-SECTION':
			skipUFO = true;
			$("#UFO-BUBBLE-CONTAINER").show();
			 $("#PARTIE-SECTION").css('animation', 'none');
			 $("#PARTIE-SECTION").css('animation', 'openZoom 1s linear 1');
			sortAscendingTeam();
			afficheEquipesScores();
			$(".hideProj").hide();
			$("#RESULTATS-BLOCK-PROJ").show();
			$("#ECRAN-CONTAINER").hide();
			$("#CHAMPION-ORDER-btn").show();
			$("#EQUIPE-ORDER-btn").show();
			$("#SORT-btn").show();
			$("#PARTIE-btn").data("action", "VOIT-PARTIE");
			$("#PARTIE-btn").show();
			$("#CONTINUE-btn").data("action", "NOUVELLE-PARTIE");
			$("#CONTINUE-btn").show();
			$("#ECRAN-PROJECTEUR").show();
			break;
		case 'FIN-SECTION':
			$("#RESULTATS-BLOCK-PROJ").hide();
			$("#ECRAN-PROJECTEUR").hide();
			$("#ECRAN-CONTAINER").show();
			$("#RESULTATS-btn").data("action", "RETOUR-RESULTATS");
			$("#RESULTATS-btn").show();
			$("#FIN-SECTION").show();
			$("#FIN-SMILE-ALERT").show();
			break;
		case 'MANAGE-SECTION':
			exportTournoiXML();
			$("#MANAGE-SECTION").show();
			$("#FIN-btn").show();
			break;
		default:
			// Handle other cases if needed
			//console.log("goToSection DEFAULT... Why here ?");
			break;
	}
}
//===============================
function openFullscreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        } else {
            // Fallback for browsers that do not support the Fullscreen API
            // You can use an alternative method here, like maximizing the window size
            window.moveTo(0, 0);
            window.resizeTo(screen.width, screen.height);
        }
    }

//===============================
function reprendrePartie() {
	// compte nbr equipes avec 0 score pour cette partie
	$("#PARTIE-SECTION").hide();
	var prop = "p" + PARTIEEnCours;
	var myNum = countP1Zero(prop);
	var myRest = LISTEEquipes.length - myNum;
	var myCtn = myRest + "/" + LISTEEquipes.length;
	if (PARTIEEnCours > 1 ) {
		showHelp = false;
	}
	if (myRest < LISTEEquipes.length) {
		// Active btn pour next étape.
		$('#PARTIE-FIN').hide();
		$('#PARTIE-RESTE').empty().append("Résultats: " + myCtn);
		$("#RESULTATS-btn").show();
	} else {	
		$("#RESULTATS-btn").hide();
		$('#PARTIE-RESTE').empty().append("J'ai tous les scores!");
		$('#PARTIE-FIN').show();
		animateStars();
		displayPartieShow();
		if (!skipUFO) {
			lanceUFO();	
		}
	}
	$("#PARTIE-SECTION").show();
}
//===============================================
function confirmNouvellePartie() {
	//PARTIEEnCours = 5;
	if (PARTIEEnCours >= 4) {
		var data = [{
			type: 'C',
			title: 'Fin du tournoi...',
			msge: "On est arrivé à la fin du tournoi. Et les lots ont été distribués. Le tournoi est fini. Passons à l'étape suivante...",
			btn1: 'Non',
			btn2: 'On y va!',
			image: "DATA/images/cool.png"
		}];
		//myMsgeBox(data, handleFinTournoi);
	} else {
		var data = [{
			type: 'C',
			title: 'Nouvelle partie ?',
			msge: "Prêt pour la prochaine partie ?",
			btn1: 'Pas encore',
			btn2: 'On y va!',
			image: "DATA/images/alert.png"
		}];
	}
	myMsgeBox(data, handleNouvellePartie);
}
//==========================================
// Function to handle confirm message box response
function handleNouvellePartie(result) {
	if (result === true) {
		if (PARTIEEnCours >= 4) {
			goToSection("FIN-SECTION");
			revientOu = "SCORES-SECTION";
		} else {
			PARTIEEnCours++;
			NOUVELLEPARTIE = true;
			goToSection('PARTIE-SECTION');
		}
	}
}
//====================================================
function cacheTout(section) {
	for (var i = 0; i < mySectionsList.length; i++) {
		if (mySectionsList[i] != section) {
			$("#" + mySectionsList[i]).hide();
		}
		//console.log("Section" + mySectionsList[i]);
	}
}
//====================================================
function voitTout() {
	for (var i = 0; i < mySectionsList.length; i++) {
		$("#" + mySectionsList[i]).show();
	}
}
//=======================================================
// SHOW LISTE DES RESULTATS DEJA INSCRITES
function startTestTournoi() {
	var data = [{
		type: 'C',
		title: 'Faisons un test :',
		msge: "Je vais créer une liste d'équipes en fin de Partie 1. Vous verrez vite comment ça marche.",
		btn1: 'Annule',
		btn2: 'Yes Boss',
		image: "DATA/images/alert.png"
	}];
	myMsgeBox(data, handleStartTestTournoi);
}
// Function to handle confirm message box response
function handleStartTestTournoi(result) {
	if (result === true) {
		TESTMODE = true;
		buildTeams();
		goToSection('INSCRIPTION-SECTION');
	} else {
		//$("#INTRO-2-SECTION").show();
	}
}
//////////////////////////////////////////////////
function initiateBaseTournoi() {
	loadEquipesInscription();
	setStartTournoiBtn();
}
/////////////////////////////////////////////////
function setStartTournoiBtn() {
	var tot = LISTEEquipes.length;
	if (tot % 2 === 0 && tot > 15) {
		clickEnabled = true;
		$("#construitTournoi").css('animation', 'zoomInOut 1s linear 3');
		$("#construitTournoi").show();
		$("#construitTournoi-off").hide();
		$("#checkOK-yes").show();
		$("#checkOK-no").hide();
	} else {
		clickEnabled = false;
		$("#construitTournoi").hide();
		$("#construitTournoi-off").show();
		$("#checkOK-yes").hide();
		$("#checkOK-no").show();
	}
	$("#enterTeamNum").empty();
	$("#enterTeamNum").append((LISTEEquipes.length + 1));
	$("#newTeamName").val("");
	$("#newTeamName").focus();
	//sortDescendingTeam();
}
/////////////////////////////////////////////////
function ConfirmDialogTournoi() {
	if (clickEnabled) {
		TOTALRESULTATS = LISTEEquipes.length;
		if (TOTALRESULTATS % 2 === 0 && TOTALRESULTATS > 15) {
			// réinitie tables
			LISTETables = [];
			var data = [{
				type: 'C',
				title: 'Fin des inscriptions ?',
				msge: "On ferme le guichet et on commence ? Attention, c'est définitif.",
				btn1: 'Attend',
				btn2: 'On commence !',
				image: "DATA/images/clock-1.png"
			}];
			myMsgeBox(data, handleStartTournoi);
		} else {
			var myData = [{
				type: "A",
				title: "On ne peut pas commencer...",
				msge: "Le nombre des inscrits n'est pas correct. Il doit être pair !",
				btn1: "D'accord Boss !",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
		}
	}
};
/////////////////////////////////////////////////
// Function to handle confirm message box response
function handleStartTournoi(result) {
	if (result === true) {
		montreDEBUT();
	} else {
		$("#INSCRIPTION-SECTION").show();
		$("#newTeamName").focus();
	}
}
//======================================
function montreDEBUT() {
		$(".hideProj").hide();
		$("#CONTINUE-btn").css({ "width": "80px", "height": "80px", "margin-bottom": "30px"});
		$("#CONTINUE-btn").show();
		$("#CONTINUE-btn").data("action", "DEBUT");
		$("#DEBUT-PROJ").show();
		$("#ECRAN-CONTAINER").hide();
		$("#ECRAN-PROJECTEUR").show();
}
//=======================================
function showMyHelp() {
	if (showHelp) {
		showHelpOn();
	} else {
		showHelpOff();
	}
}

function showHelpOff() {
	showHelp = false;
	$('#PARTIE-HELP-ON-btn').hide();
	$('#PARTIE-HELP-ON').hide();
	$('#PARTIE-HELP-OFF').show();
	$('#PARTIE-HELP-OFF-btn').show();
	$('#PARTIE-HELP-coolOFF-btn').show();
}
//=======================================
function showHelpOn() {
	showHelp = true;
	$('#PARTIE-HELP-ON-btn').show();
	$('#PARTIE-HELP-ON').show();
	$('#PARTIE-HELP-OFF-btn').hide();
	$('#PARTIE-HELP-coolOFF-btn').hide();
	$('#PARTIE-HELP-OFF').hide();
}
// ===========================
function smileAsk() {
	var myData = [{
		type: "A",
		title: "A la claire fontaine...",
		msge: "Y'a plus qu'à ouvrir le champagne. On attend depuis longtemps !",
		btn1: "Yes",
		image: "DATA/images/party.png"
	}];
	myMsgeBox(myData);
}
//===============================================
function displayPartieShow() {
	$('#PARTIE-HELP-ON-btn').hide();
	$('#PARTIE-HELP-ON').hide();
	$("#PIQUE").addClass('animateCorner-action').one('animationend', function() {
		$(this).removeClass('animateCorner-action');
	});
	$("#COEUR").addClass('animateCorner-action').one('animationend', function() {
		$(this).removeClass('animateCorner-action');
	});
	$("#CARREAU").addClass('animateCorner-action').one('animationend', function() {
		$(this).removeClass('animateCorner-action');
	});
	$("#TREFLE").addClass('animateCorner-action').one('animationend', function() {
		$(this).removeClass('animateCorner-action');
	});
	$("#myScoresPartieImg").addClass('myScoresPartieImg-action').one('animationend', function() {
		$(this).removeClass('myScoresPartieImg-action');
	});
	$("#PARTIE-HELP-OFF-btn").addClass('PARTIE-HELP-btns1').one('animationend', function() {
		$(this).removeClass('PARTIE-HELP-btns1');
	});
	$("#PARTIE-HELP-coolOFF-btn").addClass('PARTIE-HELP-btns0').one('animationend', function() {
		$(this).removeClass('PARTIE-HELP-btns0');
	});
	$("#PARTIE-HELP-ON-btn").addClass('PARTIE-HELP-btns1').one('animationend', function() {
		$(this).removeClass('PARTIE-HELP-btns1');
	});
	$("#PARTIE-HELP-OFF-IMG").addClass('PARTIE-HELP-OFF-IMG-action').one('animationend', function() {
		$(this).removeClass('PARTIE-HELP-OFF-IMG-action');
	});
	$("#PARTIE-FIN").addClass('contineStartAction').one('animationend', function() {
		$(this).removeClass('contineStartAction');
	});
	$('#PARTIE-HELP-OFF').show();
	$('#PARTIE-HELP-OFF-btn').show();
	$('#PARTIE-HELP-coolOFF-btn').show();
}
//============================================================
 // On prend un UFO au hazard et on le lance.
function lanceUFO() {
      var $container = $('<div id="ufoFlying"></div>');
      var $containerUFO = $('<div></div>');
		var ufo = myUFOS[PARTIEEnCours - 1];
		var $img = $('<img>').attr('src', ufo);
		$containerUFO.append($img);
		$container.append($containerUFO);
		$('#UFO-LANDER').empty().append($container);
		//console.log("Le UFO arrive...  url: " + ufo);
		$("#UFO-CONTAINER").addClass('UFO-action').one('animationend', function() {
    		$(this).removeClass('UFO-action');
   		 continueAction($(this))
		});
	//============================================		
	function continueAction(obj) {
	 obj.css('left', ''); // Reset the left position
    $("#UFO-BUBBLE-CONTAINER").hide();
    $("#ufoFlying").addClass('ufoFlyingAction').one('animationend', function() {
    $(this).removeClass('ufoFlyingAction');
		});
	$("#PARTIE-SECTION").css('animation', 'flipDown 0.5s linear 6');
    obj.addClass('returnAnimation').one('animationend', function() {
    $(this).removeClass('returnAnimation');
    obj.hide();
		});
	}
	$("#UFO-CONTAINER").show();
}
//============================================================
function shuffleUFOs() {
// Array of image UFO
 var imageUrls = [];
 for (var i = 1; i <= 7; i++) {
     imageUrls.push("DATA/images/ufo-" + i + ".png");
 }
 var shuffledUrls = shuffleUFOArray(imageUrls);
 return shuffledUrls;
 }
 //============================================================
function shuffleUFOArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
 }
 //============================================================  
 