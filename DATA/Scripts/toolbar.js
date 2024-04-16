//==================================================================
// Fabrice Menoyot - 2024 
//==================================================================
/* =========================*/
/* DEUX TOOLS TOOLBARS */
/* =========================*/
/*
TOOLBAR:
class="toolBtnBar"

name: "AUTEUR"
id: "AUTEUR-btn"
			
name: "PROJECTEUR"
id: "PROJECTEUR-btn"
	
name: "SETTINGS"
id: "SETTINGS-btn"
	
name: "RESULTATS"
id: "RESULTATS-btn"

name: "FIN"
id: "FIN-btn"

TOOLBAR-PROJ:
class="toolBtnBar"

name: "CHAMPION-ORDER"
id: "CHAMPION-ORDER-btn"

name: "EQUIPE-ORDER"
id: "EQUIPE-ORDER-btn"

name: "SORT"
id: "SORT-btn"

name: "PARTIE"
id: "PARTIE-btn"

name: "MANAGE"
id: "MANAGE-btn"

name: "VOIT-FIN"
id: "VOIT-FIN-btn"

name: "CONTINUE",
id: "CONTINUE-btn"

*/
//=========================================================
function createToolBar() {
	//console.log("createToolBar");
	var myToolsArray = new Array();
	var newObj = {
		name: "AUTEUR",
		image: "DATA/images/info.png",
		title: "Info sur l'auteur...",
		id: "AUTEUR-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "PROJECTEUR",
		image: "DATA/images/projecteur.png",
		title: "Comment utiliser avec projecteur...",
		id: "PROJECTEUR-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "DOWNLOAD",
		image: "DATA/images/download.png",
		title: "Téléchargez l'outil...",
		id: "DOWNLOAD-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "TOOLS",
		image: "DATA/images/tools.png",
		title: "Info technique...",
		id: "TOOLS-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "SETTINGS",
		image: "DATA/images/settings.png",
		title: "Importez ou exportez les données du tournoi...",
		id: "SETTINGS-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "RESULTATS",
		image: "DATA/images/team.png",
		title: "Passez sur l'écran des résultats...",
		id: "RESULTATS-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "FIN",
		image: "DATA/images/fin.png",
		title: "Retournez sur vos pas...",
		id: "FIN-btn"
	};
	myToolsArray.push(newObj);
	$("#TOOLBAR-CONTAINER").empty();
	// Loop through each tool and create an image
	$.each(myToolsArray, function(index, tool) {
		var imageElement = $("<img>");
		// Set the source attribute of the image
		imageElement.attr("src", tool.image);
		imageElement.addClass("toolBtnBar");
		imageElement.attr("title", tool.title);
		imageElement.attr("id", tool.id);
		imageElement.click(function() {
			toolBarAction(tool.name);
			//console.log("imageElement.click");
		});
		$("#TOOLBAR-CONTAINER").append(imageElement);
	});
}
//===============================================
// TOOLBAR PROJECTION
function createToolBarPROJ() {
	//console.log("createToolBarPROJ");
	var myToolsArray = new Array();
	var newObj = {
		name: "CHAMPION-ORDER",
		image: "DATA/images/champion.png",
		title: "Ordonner par le meilleure score...",
		id: "CHAMPION-ORDER-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "EQUIPE-ORDER",
		image: "DATA/images/team-4.png",
		title: "Ordonner par équipe...",
		id: "EQUIPE-ORDER-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "SORT",
		image: "DATA/images/sort-up.png",
		title: "Ordonner les positions...",
		id: "SORT-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "PARTIE",
		image: "DATA/images/scores.png",
		title: "Passez sur l'écran de la partie...",
		id: "PARTIE-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "MANAGE",
		image: "DATA/images/fin.png",
		title: "Retournons où nous étions...",
		id: "MANAGE-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "VOIT-FIN",
		image: "DATA/images/end.png",
		title: "Retournez sur vos pas...",
		id: "VOIT-FIN-btn"
	};
	myToolsArray.push(newObj);
	newObj = {
		name: "CONTINUE",
		image: "DATA/images/start.png",
		title: "Commençons une nouvelle partie...",
		id: "CONTINUE-btn"
	};
	myToolsArray.push(newObj);
	$("#TOOLBAR-PROJ-CONTAINER").empty();
	// Loop through each tool and create an image
	$.each(myToolsArray, function(index, tool) {
		//console.log("createToolBarProj :" + tool.title);
		var imageElement = $("<img>");
		// Set the source attribute of the image
		imageElement.attr("src", tool.image);
		imageElement.addClass("toolBtnBar");
		imageElement.attr("title", tool.title);
		imageElement.attr("id", tool.id);
		$("#TOOLBAR-PROJ-CONTAINER").append(imageElement);
		imageElement.click(function() {
			toolBarAction(tool.name);
			// Add imgClicked class to the clicked tool
		});
	});
}
//==================================================================
function toolBarAction(loc) {
	// ACTIONS TOOBAR
	switch (loc) {
		case "AUTEUR":
			aboutAuthor();
			break;
		case "PROJECTEUR":
			var myData = [{
				type: "A",
				title: "Utilisation d'un projecteur...",
				msge: "Pour l'instant la seule configuration qui marche bien, c'est Miroir et résolution de chaque écran à 1280 x 720.",
				btn1: "Yes Boss !",
				image: "DATA/images/projecteur.png"
			}];
			resetScore();
			myMsgeBox(myData);
			break;
			
		case "DOWNLOAD":
			var myData = [{
				type: "C",
				title: "Télécharger cet outil...",
				msge: "Voulez-vous télécharger cet outil pour l'utiliser hors ligne ?",
				btn2: "Yes Boss !",
				btn1: "Non merci",
				image: "DATA/images/download.png"
			}];
			myMsgeBox(myData,handleDownload);
			break;
			
		case "TOOLS":
			aboutOutil();
			break;
			
			
		case "SETTINGS":
			skipUFO = true;
			$("#UFO-BUBBLE-CONTAINER").show();
			 $("#PARTIE-SECTION").css('animation', 'none');
			$("#PARTIE-SECTION").css('animation', 'openZoom 1s linear 1');
			exportTournoiXML();
			$("#" + SECTIONEnCours + "").hide();
			$("#FIN-btn").show();
			$("#FIN-btn").data("action", "RETOUR");
			$("#SETTINGS-btn").hide();
			$("#FIN-btn").show();
			$("#MANAGE-SECTION").show();
			break;
		case "RESULTATS":
			var actionValue = $("#RESULTATS-btn").data("action");
			if (actionValue == "VOIT-RESULTATS") {
				sortAscendingTeam();
				afficheEquipesScores();
				$(".hideProj").hide();
				$("#RESULTATS-BLOCK-PROJ").show();
				$("#ECRAN-CONTAINER").hide();
				$("#PARTIE-btn").data("action", "VOIT-PARTIE");
				$("#PARTIE-btn").show();
				$("#ECRAN-PROJECTEUR").show();
			}
			if (actionValue == "RETOUR-RESULTATS") {
				sortPosition("D");
				$(".hideProj").hide();
				$("#RESULTATS-BLOCK-PROJ").show();
				$("#ECRAN-CONTAINER").hide();
				$("#CHAMPION-ORDER-btn").show();
				$("#EQUIPE-ORDER-btn").show();
				$("#SORT-btn").show();
				$("#VOIT-FIN-btn").show();
				$("#ECRAN-PROJECTEUR").show();
			}
			//console.log("actionValue: " + actionValue);
			break;
		case "FIN":
			var actionValue = $("#FIN-btn").data("action");
			if (actionValue == "RETOUR") {
				$("#MANAGE-SECTION").hide();
				$("#" + SECTIONEnCours + "").show();
				$("#FIN-btn").hide();
				$("#FIN-btn").data("action", "");
				$("#SETTINGS-btn").show();
			} else {
				goToSection("FIN-SECTION");
			}
			break;
			// ACTIONS TOOBAR	PROJO	
		case 'CHAMPION-ORDER':
			sortPosition('D');
			sortDown = true;
			toggleSort();
			break;
		case 'EQUIPE-ORDER':
			sortAscendingTeam();
			afficheEquipesScores();
			sortDown = false;
			toggleSort();
			break;
		case 'SORT':
			toggleSortBtn();
			break;
		case 'PARTIE':
			var actionValue = $("#PARTIE-btn").data("action");
			if (actionValue == "VOIT-PARTIE") {
				revientOu = "SCORES-SECTION";
				$("#RESULTATS-BLOCK-PROJ").hide();
				$(".toolBtnBar").hide();
				$("#ECRAN-PROJECTEUR").hide();
				$("#ECRAN-CONTAINER").show();
				skipUFO = true;
				reprendrePartie();
				
				$("#PARTIE-SECTION").show();
				$("#RESULTATS-btn").data("action", "VOIT-RESULTATS");
				//$("#RESULTATS-btn").show();
				$("#SETTINGS-btn").show();
			}
			break;
		case 'MANAGE':
			$("#MANAGE-SECTION").hide();
			goToSection("FIN-SECTION");
			break;
		case 'VOIT-FIN':
			goToSection("FIN-SECTION");
			break;
		case 'CONTINUE':
			var actionValue = $("#CONTINUE-btn").data("action");
			var restoreValue = $("#CONTINUE-btn").data("restaure");
			if (actionValue == "PARTIE-START") {
				$("#TABLEAU-CONTAINER-PROJ").hide();
				$(".toolBtnBar").hide();
				$("#ECRAN-PROJECTEUR").hide();
				$("#ECRAN-CONTAINER").show();
				cacheTout();
				$("#SETTINGS-btn").show();
				$("#RESULTATS-btn").data("action", "VOIT-RESULTATS");
				$('#RESULTATS-btn').show();
				$(".pleinEcran").hide();
				if (restoreValue == "YES") {
					$("#CONTINUE-btn").data("restaure", "NO");
					skipUFO = true;
					reprendrePartie();
				}
				$("#PARTIE-SECTION").show();
			} else if (actionValue == "DEBUT") {
				$("#CONTINUE-btn").data("action", "");	
				$("#CONTINUE-btn").css({ "width": "48px", "height": "48px", "margin-bottom": ""});
				$("#DEBUT-PROJ").hide();
				$(".toolBtnBar").hide();
				$("#ECRAN-PROJECTEUR").hide();
				$("#ECRAN-CONTAINER").show();
				goToSection("PARTIE-SECTION");
			
			} else {
				confirmNouvellePartie();
			}
			break;
		default:
			break;
	}
}
//=======================================
function handleDownload(result) {
		if (result === true) {
		var zipUrl = 'DATA/Tournoi-Belote-v1.1.zip';
      window.location.href = zipUrl;
	} else {
		//
	}
}
//========================
// Function to trigger download
  function downloadFile(url) {
        // Create a hidden link element
       
}
