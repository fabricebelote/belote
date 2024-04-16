//===================================================
// Fabrice Menoyot - 2024
//====================================================
//==========================================
function exportTournoiXML() {
	var xmlString = exportDataToXML();
	$('#XML-CONTENU-EXPORT').val(xmlString);
	localStorage.clear();
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		localStorage.setItem('TournoiBelote', xmlString);
		//console.log("XML: " + xmlString);
		//	console.log("Storage allowed!");
	} else {
		console.log("Sorry, your browser does not support Web Storage...!");
	}
}
//==============================================
// Vérifie s'il y a un tournoi en stockage interne pour le restaurer au cas où on ferme navigateur en cours.
function checkTournoiExist() {
	cacheTout();
	var value = localStorage.getItem('TournoiBelote');
	//console.log("value... " + value);
	if (value != "") {
		var valRet = restoreDataFromXML(value);
		
		console.log("var valRet: " + valRet);
		// Vérifie si une partie est en cours
		if (valRet > 0) {
			console.log("Tournoi en cours... RESTAURE ");
			var data = [{
				type: 'C',
				title: 'Restauration du Tournoi :',
				msge: "J’ai trouvé un tournoi en mémoire. Est-ce que je le restaure ?",
				btn1: 'Pas de Restaure',
				btn2: 'Restaure',
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(data, handleRestoreTournoi);
		} else {
			console.log("Pas de Tournoi en cours... SKIP RESTAURE ");
			goToSection("INTRO-SECTION");
		}
	} else {
		console.log("Pas de storage TournoiBelote");
		goToSection("INTRO-SECTION");
	}
}
// Function to handle confirm message box response
function handleRestoreTournoi(result) {
	if (result === true) {
		restaureTournoiEnCours();
	} else {
		localStorage.clear();
		goToSection("INTRO-SECTION");
	}
}
//==========================================
function restaureTournoiEnCours() {
	var value = localStorage.getItem('TournoiBelote');
	var stat = restoreDataFromXMLFINAL(value);
	TOTALRESULTATS = LISTEEquipes.length;
	calculateTotal();
	calculatePosition();
	// Définir où on est
	PARTIEEnCours = trouvePartieEncours(LISTEEquipes);
	NOUVELLEPARTIE = false;
	SECTIONEnCours = "PARTIE-SECTION";
	//console.log("PARTIEEnCours:", PARTIEEnCours);
	//console.log("NOUVELLEPARTIE:", NOUVELLEPARTIE);
	//console.log("SECTIONEnCours:", SECTIONEnCours);
	$("#CONTINUE-btn").data("restaure", "YES");
	$("#ECRAN-CONTAINER").show();
	goToSection("PARTIE-SECTION");
}
//===============================================
//==========================================
function restaureTournoiXML() {
	var value = $('#XML-CONTENU-IMPORT').val();
	if (value != "") {
		var stat = restoreDataFromXMLFINAL(value);
		if (stat > -1) {
			TOTALRESULTATS = LISTEEquipes.length;
			calculateTotal();
			calculatePosition();
			// Définir où on est
			PARTIEEnCours = trouvePartieEncours(LISTEEquipes);
			NOUVELLEPARTIE = false;
			SECTIONEnCours = "PARTIE-SECTION";
			//console.log("PARTIEEnCours:", PARTIEEnCours);
			//console.log("NOUVELLEPARTIE:", NOUVELLEPARTIE);
			//console.log("SECTIONEnCours:", SECTIONEnCours);
			goToSection("PARTIE-SECTION");
			var myData = [{
				type: "A",
				title: "Et voilà..",
				msge: "Le tournoi a été restauré. Bonne continuation!",
				btn1: "Yes Boss !",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
		} else {
			var myData = [{
				type: "A",
				title: "Euh... Problème !",
				msge: "Ce fichier n'est pas conforme à ma structure...",
				btn1: "Yes Boss !",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
		}
	} else {
		var myData = [{
				type: "A",
				title: "Euh... On clique dans le vide !",
				msge: "Si y'a rien à importer, je fais quoi, moi ?",
				btn1: "Désolé !",
				image: "DATA/images/alert.png"
			}];
			myMsgeBox(myData);
	}
}
////////////////////////////////////////////////////////////////////////////////
function checkStorage() {
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		alert("Storage allowed!");
	} else {
		// Sorry! No Web Storage support..
		alert("Storage NOT allowed!");
	}
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		// Store
		//localStorage.setItem("lastname", "Smith");
		// Retrieve
		// document.getElementById("result").innerHTML = localStorage.getItem("lastname");
	} else {
		//document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}
//==========================================
function XMLCOPYDATA() {
	// Get the text field
    var textarea = document.getElementById('XML-CONTENU-EXPORT');
    textarea.select();
    document.execCommand('copy');
}
//==========================================
function XMLPASTEDATA() {
	$("#XML-CONTENU-IMPORT").focus();
	var myData = [{
		type: "A",
		title: "Action à réaliser...",
		msge: "Collez le texte en utilisant le raccourci clavier: 'Ctrl V'. Cela placera le contenu du Presse Papier dans la zone d'importation.",
		btn1: "Yes Boss !",
		image: "DATA/images/alert.png"
	}];
	myMsgeBox(myData, waitXMLimport);
}
//==========================================
function waitXMLimport() {
	$("#XML-CONTENU-IMPORT").focus();
}
//==========================================
function XMLIMPORTDATA() {
	restaureTournoiXML();
}
//============================================================
function exportDataToXML() {
	// Construct XML string
	var xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<data>';
	if (LISTETables.length > 0) {
		for (var z = 0; z < 4; z++) {
			xmlString += '\n  <tablesP' + z + '>';
			for (var k = 0; k < LISTETables[z].length; k++) {
				var num = k + 1;
				var maValue = LISTETables[z][k];
				var maValue1 = maValue.equipeA;
				var maValue2 = maValue.equipeB;
				xmlString += '\n    <table>';
				xmlString += '\n      <equipeA>' + maValue1 + '</equipeA>';
				xmlString += '\n      <equipeB>' + maValue2 + '</equipeB>';
				xmlString += '\n     </table>';
			}
			xmlString += '\n  </tablesP' + z + '>';
		}
	}
	var myID = "2145";
	// Add global variables to XML
	xmlString += '\n  <tournoiID>';
	xmlString += '\n    <id>' + myID + '</id>';
	xmlString += '\n  </tournoiID>';
	LISTEEquipes.forEach(function(obj) {
		xmlString += '\n  <equipe>\n';
		for (var key in obj) {
			xmlString += '    <' + key + '>' + obj[key] + '</' + key + '>\n';
		}
		xmlString += '  </equipe>\n';
	});
	xmlString += '</data>';
	// Return the XML string
	return xmlString;
}
//=========================================
function restoreDataFromXMLFINAL(xmlData) {
	// Clear existing data
	LISTEEquipes = [];
	LISTETables = [];
	// Parse XML data
	var xmlDoc = $.parseXML(xmlData);
	var $xml = $(xmlDoc);
	var myIDfound = $xml.find('id').text();
	if (myIDfound != "2145") {
		return -1;
	} else {
		// Restore LISTETables
		for (var i = 0; i < 4; i++) {
			var tables = [];
			$xml.find('tablesP' + i + ' table').each(function() {
				var equipeA = parseInt($(this).find('equipeA').text());
				var equipeB = parseInt($(this).find('equipeB').text());
				tables.push({
					equipeA: equipeA,
					equipeB: equipeB
				});
			});
			LISTETables.push(tables);
		}
		// Restore LISTEEquipes
		$xml.find('equipe').each(function() {
			var num = parseInt($(this).find('num').text());
			var nom = $(this).find('nom').text();
			var p1 = parseInt($(this).find('p1').text());
			var p2 = parseInt($(this).find('p2').text());
			var p3 = parseInt($(this).find('p3').text());
			var p4 = parseInt($(this).find('p4').text());
			var total = parseInt($(this).find('total').text());
			var pos = parseInt($(this).find('pos').text());
			var objet = {
				num: num,
				nom: nom,
				p1: p1,
				p2: p2,
				p3: p3,
				p4: p4,
				total: total,
				pos: pos
			};
			LISTEEquipes.push(objet);
		});
	}
	// Now the data has been restored to the variables and arrays
	// Display the values of the new variables and arrays
	//  console.log("LISTEEquipes:", LISTEEquipes);
	// console.log("LISTETables:", LISTETables);
	// You can return them or perform any additional operations as needed
	return 1;
}
//=========================================
function restoreDataFromXML(xmlData) {
	var myRet = 0;
	// Clear existing data
	var LISTEEquipesTEMP = [];
	var LISTETablesTEMP = [];
	// Parse XML data
	var xmlDoc = $.parseXML(xmlData);
	var $xml = $(xmlDoc);
	var myIDfound = $xml.find('id').text();
	if (myIDfound != "2145") {
		return -1;
	} else {
		// Restore LISTETables
		for (var i = 0; i < 4; i++) {
			var tables = [];
			$xml.find('tablesP' + i + ' table').each(function() {
				var equipeA = parseInt($(this).find('equipeA').text());
				var equipeB = parseInt($(this).find('equipeB').text());
				tables.push({
					equipeA: equipeA,
					equipeB: equipeB
				});
			});
			LISTETablesTEMP.push(tables);
		}
		// Restore LISTEEquipes
		$xml.find('equipe').each(function() {
			var num = parseInt($(this).find('num').text());
			var nom = $(this).find('nom').text();
			var p1 = parseInt($(this).find('p1').text());
			var p2 = parseInt($(this).find('p2').text());
			var p3 = parseInt($(this).find('p3').text());
			var p4 = parseInt($(this).find('p4').text());
			var total = parseInt($(this).find('total').text());
			var pos = parseInt($(this).find('pos').text());
			var objet = {
				num: num,
				nom: nom,
				p1: p1,
				p2: p2,
				p3: p3,
				p4: p4,
				total: total,
				pos: pos
			};
			LISTEEquipesTEMP.push(objet);
		});
	}
	if (LISTEEquipesTEMP.length > 15) {
		myRet = trouvePartieEncours(LISTEEquipesTEMP);
	}
	// Now the data has been restored to the variables and arrays
	// Display the values of the new variables and arrays
	// console.log("LISTEEquipesTEMP:", LISTEEquipesTEMP);
	// console.log("LISTETablesTEMP:", LISTETablesTEMP);
	// You can return them or perform any additional operations as needed
	return myRet;
}
