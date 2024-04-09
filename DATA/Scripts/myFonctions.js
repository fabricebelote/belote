//===================================================
// Fabrice Menoyot - 2024
//====================================================

//===============================================================================================
// Structures des 2 arrays de base
//===============================================================================================
/*
var LISTEEquipes = new Array();
var objet = {
			num: 0,
			nom: element,
			p1: 0,
			p2: 0,
			p3: 0,
			p4: 0,
			total: 0,
			pos: 0
};
LISTEEquipes.push(objet);

var LISTETables = new Array();
LISTETables[0][0]  LISTETables[0][1]
LISTETables[1][0]  LISTETables[1][1]
LISTETables[2][0]  LISTETables[2][1]
LISTETables[3][0]  LISTETables[3][1]

var P1, P2, P3, P4 = new Array(1);
LISTETables.push(P1, P2, P3, P4);	
*/
//==========================================

function returnHello() {
	var date = new Date();
	var hour = date.getHours();
	var salutation = "";
	if (hour >= 5 && hour < 12) {
		salutation = "Bonjour";
	} else if (hour >= 12 && hour < 17) {
		salutation = "Bon après-midi";
	} else if (hour >= 17 && hour < 22) {
		salutation = "Bonsoir";
	} else {
		salutation = "Bonne nuit";
	}
	return salutation;
}
//============== CREER UNE LISTE D'EQUIPE Temporaire =============================================
function buildTeams() {
	// Chaîne de liste
	var maListArray = ["Jean et les Troubadours", "Jean et les Vikings", "Pierre et les Spartiates", "Marie et les Aventuriers", "Paul et les Explorateurs", "François et les Tigres", "Sophie et les Phénix", "Luc et les Renards", "Émilie et les Loups", "Jacques et les Dragons", "Pierre et les Troubadours", "Jean et les Vikings", "Marie et les Spartiates", "Paul et les Aventuriers", "Sophie et les Explorateurs", "Luc et les Tigres", "Émilie et les Phénix", "Jacques et les Renards", "François et les Loups", "Pierre et les Dragons", "Jean et les Troubadours", "Marie et les Vikings", "Paul et les Spartiates", "Sophie et les Aventuriers", "Luc et les Explorateurs", "Émilie et les Tigres", "Jacques et les Phénix", "François et les Renards", "Pierre et les Loups", "Jean et les Dragons", "Marie et les Troubadours", "Paul et les Vikings", "Sophie et les Spartiates", "Luc et les Aventuriers", "Émilie et les Explorateurs", "Jacques et les Tigres", "François et les Phénix", "Pierre et les Renards", "Jean et les Loups", "Marie et les Dragons", "Paul et les Troubadours", "Sophie et les Vikings", "Luc et les Spartiates", "Émilie et les Aventuriers", "Jacques et les Explorateurs", "François et les Tigres"];
	// Shuffle the list
	maListArray = shuffleArray(maListArray);
	var tot = Math.floor(Math.random() * (40 - 28 + 1)) + 28;
	if (estPair(tot)) {
		tot--;
	}
	tot = 19;
	// Parcourir la liste et créer un tableau avec 8 colonnes
	for (var i = 0; i < tot; i++) {
		var element = maListArray[i].trim(); // Supprimer les espaces avant et après le nom
		// Créer un objet avec les colonnes nécessaires
		var objet = {
			num: i + 1,
			nom: element,
			p1: 0,
			p2: 0,
			p3: 0,
			p4: 0,
			total: 0,
			pos: 0
		};
		// Ajouter l'objet au tableau final
		LISTEEquipes.push(objet);
	}
	TOTALRESULTATS = LISTEEquipes.length;
	// Loop through each element of the array and log it
	//LISTEEquipes.forEach(function(element) {
	//    console.log(element);
	//});
}
//===========================
function assignFakeScores() {
	if (typeof LISTETables !== 'undefined' && LISTETables !== null && LISTETables.length > 0) {
		for (var k = 0; k < LISTETables[0].length; k++) {
			var maValue = LISTETables[0][k];
			var equipeA = Number(maValue.equipeA);
			var equipeB = Number(maValue.equipeB);
			//console.log("equipeA + "+ equipeA);
			//console.log("equipeB + "+ equipeB);
			
			var sc1 = Math.floor(Math.random() * (1900 - 110 + 1)) + 110;
			var sc2 = 1944 - sc1;
			if (sc1 === 1944) { sc2 = 0; }
			var index = 0;
			if (k === 5) {
				index = LISTEEquipes.findIndex(item => item.num === Number(equipeA));
				if (index !== -1) { LISTEEquipes[index].p1 = 0;}
				index = LISTEEquipes.findIndex(item => item.num === Number(equipeB));
				if (index !== -1) { LISTEEquipes[index].p1 = 0;}
			} else {
				index = LISTEEquipes.findIndex(item => item.num === Number(equipeA));
				if (index !== -1) {  LISTEEquipes[index].p1 = sc1; }
				index = LISTEEquipes.findIndex(item => item.num === Number(equipeB));
				if (index !== -1) { LISTEEquipes[index].p1 = sc2;}
			}
		}
		calculateTotal();
		calculatePosition();
		sortDescendingTeam();
	}
}
//===========================
// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


//=======================================================
// Utilisation...
//=======================================================
function displayScore(rowNum) {
	var equipeA = LISTEPartie[rowNum][0];
	var equipeB = LISTEPartie[rowNum][1];
	var scoresArrayA = returnScore(equipeA);
	var equipeAScore = scoresArrayA[PARTIEEnCours - 1];
	//console.log("Scores A: " + equipeAScore);
	var aa = "";
	if (Number(equipeAScore) > 0) {
		aa = equipeAScore;
	} else {
		aa = "";
	}
	var scoresArrayB = returnScore(equipeB);
	var equipeBScore = scoresArrayB[PARTIEEnCours - 1];
	var bb = "";
	if (Number(equipeBScore) > 0) {
		bb = equipeBScore;
	} else {
		bb = "";
	}
	$('#EQUIPEA-INPUT').val(aa);
	$('#EQUIPEA-INPUT').attr("name", equipeA);
	$('#EQUIPEA-H1').empty().append("Equipe: " + equipeA);
	$('#EQUIPEB-INPUT').val(bb);
	$('#EQUIPEB-INPUT').attr("name", equipeB);
	$('#EQUIPEB-H1').empty().append("Equipe: " + equipeB);
	$('#EQUIPEA-INPUT').prop('readonly', false);
	$('#myScoresPartieCover').hide();
	$('#myScoresPartie').show();
	$('#EQUIPEA-INPUT').focus();
}
//////////////////////////////////////////
//===========================================
function askForConfirmScore() {
	var equipeA = $('#EQUIPEA-INPUT').attr('name');
	var scoreA = $('#EQUIPEA-INPUT').val();
	var equipeB = $('#EQUIPEB-INPUT').attr('name');
	var scoreB = $('#EQUIPEB-INPUT').val();
	var myTot = scoreA + scoreB;
	if (scoreA > 1944 || scoreA < 0) {
		// Code block if myTot is greater than 1944 or less than 0
		var myData = [{
			type: "A",
			title: "Euh... Problème !",
			msge: "Ce score n'est pas correct (" + scoreA + "). Vérifiez les calculs!",
			btn1: "Yes Boss !",
			image: "DATA/images/alert.png"
		}];
		resetScore();
		myMsgeBox(myData);
	} else {
		// Code block if myTot is within the range 0 to 1944
		var data = [{
			type: 'SCORE',
			title: 'Vérifions vos scores :',
			msge: "Vous confirmez ces scores ?",
			btn1: 'Non, je vérifie',
			btn2: 'Yes Boss',
			image: "DATA/images/alert.png",
			equipe1Name: "Equipe: " + equipeA,
			score1: scoreA,
			equipe2Name: "Equipe: " + equipeB,
			score2: scoreB,
			approuve: "Dites les mots magiques..."
		}];
		myMsgeBox(data, askForConfirmScoreWAIT);
	}
}
//===========================================
// Function to handle confirm message box response
function askForConfirmScoreWAIT(result) {
	if (result === true) {
		saveScore();
	} else {
		resetScore();
	}
}
//===========================================
function saveScore() {
	sortAscendingTeam();
	var myDest = "p" + PARTIEEnCours;
	//console.log("myDest: " + "p" + PARTIEEnCours);
	var equipeA = $('#EQUIPEA-INPUT').attr('name');
	var scoreA = Number($('#EQUIPEA-INPUT').val());
	saveMyScore(equipeA, scoreA, myDest);
	var equipeB = $('#EQUIPEB-INPUT').attr('name');
	scoreB = (1944 - scoreA);
	saveMyScore(equipeB, scoreB, myDest);
	calculatePosition();
	//console.log("calculatePosition");
	exportTournoiXML();
	$('#myScoresPartieCover').show();
	$('#myScoresPartie').hide();
	$('#EQUIPEA-INPUT').prop('readonly', true);
	reprendrePartie();
}
//===========================================
function resetScore() {
	$('#EQUIPEA-INPUT').val("");
	$('#EQUIPEB-INPUT').val("");
	$('#EQUIPEA-INPUT').prop('readonly', true);
	$('#myScoresPartieCover').show();
	$('#myScoresPartie').hide();
}
//=================================================================
function saveMyScore(userId, aNumber, field) {
	skipUFO = false;
	//	console.log("saveMyScore...Equipe " + userId + ' - Score: ' + aNumber);
	var propName = field.toLowerCase(); // Convert field to lowercase
	const index = LISTEEquipes.findIndex(item => item.num === Number(userId));
	if (index !== -1) {
		// console.log("saveMyScore OK: " + userId);
		LISTEEquipes[index][propName] = aNumber; // Update the property with the new score
		//console.log("[propName]: " + propName);
		//console.log("LISTEEquipes[index][propName]: " + LISTEEquipes[index][propName]);
	} else {
		// console.log("saveMyScore NO: " + userId);
	}
	// Recalculate total score
	calculateTotal();
	// console.log("Recalculate total");
	return LISTEEquipes[index][propName]; // Return the updated score
}
////////////////////////////////////////////////////////////
// Function to get row number on click
function modifieEquipeNom(teamNum) {
	dataEnCours = "";
	var index = LISTEEquipes.findIndex(item => item.num === teamNum);
	if (index !== -1) { dataEnCours = LISTEEquipes[index].nom ;}
	
	equipeInMemoire = teamNum;
	var myData = [{
		type: "P",
		title: "Alors, on fait des changements ?",
		msge: "C'est quoi le nouveau nom?",
		btn1: "Annule",
		btn2: "Enregistre",
		textInput: dataEnCours,
		image: "DATA/images/prompt.png"
	}];
	myMsgeBox(myData, handleStartModifie);
}
// Function to handle confirm message box response
function handleStartModifie(result) {
	if (result == null) {
		$("#newTeamName").val("");
		$("#newTeamName").focus();
		return;
	}
	if (result == dataEnCours) {
		var myData = [{
			type: "A",
			title: "Euh... Pas de changement ?",
			msge: "Vous n'avez pas changé le nom !",
			btn1: "Yes Boss !",
			image: "DATA/images/alert.png"
		}];
		myMsgeBox(myData);
		return;
	}
	if (findDuplicate(result)) {
		var myData = [{
			type: "A",
			title: "Euh... Nom déjà utilisé !",
			msge: "Cette équipe est déjà inscrite !",
			btn1: "Yes Boss !",
			image: "DATA/images/alert.png"
		}];
		myMsgeBox(myData);
		return;
	}
	changeName(dataEnCours, result);
}
// Check text is safe
function isSafeInput(monText) {
	// Implement your safety checks here
	// For demonstration purposes, this function only checks if the input contains any HTML tags
	var regex = /<[^>]*>/;
	return !regex.test(monText);
}
//=============================================
// Fonction pour changer le nom d'un objet dans LISTEEquipes
function changeName(oldName, newName) {
	if (!findDuplicate(newName)) {
		const index = LISTEEquipes.findIndex(item => item.num === equipeInMemoire);
		if (index !== -1) {
			console.log("changeName OK: " + equipeInMemoire);
			LISTEEquipes[index].nom = newName;
			exportTournoiXML();
			//if (SECTIONEnCours == "SCORES-SECTION") {
				// referesh la table.
				afficheEquipesScores();
			//} else {
				loadEquipesInscription();
			//}
		} else {
			console.log("changeName NO: " + equipeInMemoire);
		}
	} else {
		//alert("Ce nom existe déjà dans la liste !");
		var myData = [{
			type: "A",
			title: "Ce nom n'est pas accepté...",
			msge: "Ce nom existe déjà dans la liste !",
			btn1: "Yes Boss !",
			image: "DATA/images/alert.png"
		}];
		myMsgeBox(myData);
	}
}
//===============================================
// Fonction pour ajouter un nouveau nom à LISTEEquipes
function addName(newName) {
	if (!findDuplicate(newName)) {
		var nouvelObjet = {
			num: LISTEEquipes.length + 1,
			nom: newName,
			p1: 0,
			p2: 0,
			p3: 0,
			p4: 0,
			total: 0,
			pos: 0
		};
		LISTEEquipes.push(nouvelObjet);
		exportTournoiXML();
		sortDescendingTeam();
		$("#INSCRIPTION-GAUCHE").addClass('rotateOnObject').one('animationend', function() {
    		$(this).removeClass('rotateOnObject');
		});

	
	} else {
		//alert("Ce nom existe déjà dans la liste !");
		var myData = [{
			type: "A",
			title: "Ce nom n'est pas accepté...",
			msge: "Ce nom existe déjà dans la liste !",
			btn1: "Yes Boss !",
			image: "DATA/images/alert.png"
		}];
		myMsgeBox(myData);
	}
}
/////////////////////////////////////////////////////////////////
function saveBtnEquipe(nom) {
	if (nom != "") {
		var element = nom.trim(); // Supprimer les espaces avant et après le nom
		if (element.length > 50) {
			// this.value = inputValue.substring(0, 50); // Truncate input to 50 characters
			var myData = [{
				type: "A",
				title: "Désolé... ",
				msge: "Le nom est trop long... Max:50 caractères !",
				btn1: "Yes Boss",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
			return;
		}
		// Check if input is safe
		if (!isSafeInput(nom)) {
			// You may choose to handle unsafe input differently, e.g., clear the input field
			//this.value = ''; // Clear the input field
			// alert("Nom corrompu);
			var myData = [{
				type: "A",
				title: "Désolé... ",
				msge: "Le nom contient des caractères non acceptable.",
				btn1: "Oh la la !",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
			return;
		}
		addName(element);
		// met à jour nbr d'équipes
		TOTALRESULTATS = LISTEEquipes.length;
		loadEquipesInscription();
		setStartTournoiBtn();
	} else {
		// alert("Il faut un nom ! ");
		var myData = [{
			type: "A",
			title: "Euh... Vous faites quoi ?",
			msge: "Il est où le nom ? Vous le voyez ?",
			btn1: "Oh la la !",
			image: "DATA/images/alert.png"
		}];
		myMsgeBox(myData);
	}
}
