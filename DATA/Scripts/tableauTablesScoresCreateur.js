//===================================================
// Fabrice Menoyot - 2024
//====================================================
//=====================================
function setResultatsFont() {
	var myNew = String(myFontSize + "em");
	$('#SCORES-PROJ').css('font-size', myNew);
}

function changeFontPlus() {
	myFontSize += 0.1;
	var myNew = String(myFontSize + "em");
	$('#SCORES-PROJ').css('font-size', myNew);
}

function changeFontMinus() {
	myFontSize -= 0.1;
	var myNew = String(myFontSize + "em");
	$('#SCORES-PROJ').css('font-size', myNew);
}
//============================================
function setPartieFont() {
	var myNew = String(myPartieFontSize + "em");
	$('#PARTIE-TABLEAU-PROJ').css('font-size', myNew);
}

function changePartieFontPlus() {
	myPartieFontSize += 0.1;
	var myNew = String(myPartieFontSize + "em");
	$('#PARTIE-TABLEAU-PROJ').css('font-size', myNew);
}

function changePartieFontMinus() {
	myPartieFontSize -= 0.1;
	var myNew = String(myPartieFontSize + "em");
	$('#PARTIE-TABLEAU-PROJ').css('font-size', myNew);
}
//===============================================
// Function to change font size
function changeFontSize(fontSize) {
	document.getElementById("PARTIE-TABLEAU").style.fontSize = fontSize;
}
//////////////////////////////////////////
function toggleSort() {
	if (sortDown) {
		$("#SORT-btn").attr("src", 'DATA/images/sort-down.png');
	} else {
		$("#SORT-btn").attr("src", 'DATA/images/sort-up.png');
	}
}
//////////////////////////////////////////
function toggleSortBtn() {
	if (sortDown) {
		sortPosition('A');
		sortDown = false;
	} else {
		sortPosition('D');
		sortDown = true;
	}
	toggleSort();
}
//////////////////////////////////////////
// Function to change row color on mouseover
function changeRowColor(row) {
	$(row).toggleClass('highlight');
}

function restoreRowColor(row) {
	$(row).toggleClass('highlight');
}
//========================================================
function modifieEquipeScore(teamNum) {
	modifieEquipeNom(teamNum);
}
/////////////////////////////////////////////////////////
function loadEquipesInscription() {
	/*
	var objetName = {
		num: "N°",
		nom: "Nom de l'équipe",
		p1: "",
		p2: "",
		p3: "",
		p4: "",
		total: "",
		pos: ""
	};
*/
	var objetCols = {
		num: 1,
		nom: 1,
		p1: 0,
		p2: 0,
		p3: 0,
		p4: 0,
		total: 0,
		pos: 0
	};
	createTableEquipes(objetCols);
	//createTableEquipes(objetName,objetCols, "INSCRIPTION-RESULTATS");
}
///////////////////////////////////////////////////////////////////////////
//Selon le nombre d'equipe, cette fonction distribue aléatoirement les equipes sur 4 parties.
function generateTables(scores) {
	//PARTIEEnCours = 1;
	//NOUVELLEPARTIE = true;
	TOTALRESULTATS = LISTEEquipes.length;
	if (LISTETables.length > 1) {
		alert("Le tournoi est déjà en cours...");
	} else {
		//var tables = [];
		var allPairs = new Set();
		var duplicates = new Set();
		// Fonction pour générer une paire unique qui n'exite dans aucun des 4 tableaux
		function generateUniquePair(usedPairs) {
			var pair;
			do {
				var num1 = Math.floor(Math.random() * TOTALRESULTATS) + 1;
				var num2 = Math.floor(Math.random() * TOTALRESULTATS) + 1;
				pair = [Math.min(num1, num2), Math.max(num1, num2)];
			}
			while (pair[0] === pair[1] || usedPairs.has(pair[0]) || usedPairs.has(pair[1]) || allPairs.has(pair));
			usedPairs.add(pair[0]);
			usedPairs.add(pair[0]);
			usedPairs.add(pair[1]);
			return pair;
		}
		// Créer les 4 tableaux
		for (var k = 0; k < 4; k++) {
			var table = [];
			var usedPairs = new Set();
			// Remplir les tableaux avec paires uniques
			for (var l = 0; l < TOTALRESULTATS / 2; l++) {
				var pair = generateUniquePair(usedPairs);
				// Vérifier que cette paire n'existe pas
				if (allPairs.has(pair)) {
					duplicates.add(pair);
				}
				var tableItem = {
					equipeA: pair[0],
					equipeB: pair[1]
				};
				table.push(tableItem);
				allPairs.add(pair);
			}
			// Ajouter le tableau généré à la liste des tableaux
			LISTETables.push(table);
		}
		//console.log("LISTETables from generate");
		//	LISTETables.forEach(function(element) {
		//  console.log(element);
		//});
		// Afficher les paires en double dans la console
		if (duplicates.size > 0) {
			console.log("Paires en double :");
			duplicates.forEach(function(pair) {
				console.log(pair.map(Number));
			});
		} else {
			// console.log("Aucune paire en double.");
		}
		// alert("Les équipes ont été réparties pour les 4 parties.")  
	}
	if (scores) {
		// Cree des fake scores pour tests
		assignFakeScores();
	}
	exportTournoiXML();
	//console.log("LISTEEquipes: " + LISTEEquipes);
	//console.log("LISTETables: " + LISTETables);
}
//=======================================
function afficheTable(NUM) {
	TOTALRESULTATS = LISTEEquipes.length;
	var $headerDiv = $("#PARTIE-TABLEAU-HEADER-DIV");
	$headerDiv.empty(); // Clear previous content
	// Create the header row
	var $myRow = $("<tr>").addClass("PARTIE-TABLE-HEADER-ROW");
	var $myCol1 = $("<th>").text("Table");
	var $myCol2 = $("<th>").text("A");
	var $myCol3 = $("<th>").text("B");
	$myRow.append($myCol1, $myCol2, $myCol3);
	// Append the header row to the headerDiv
	var $headerTable = $("<table>").attr("id", "PARTIE-TABLE-HEADER").append($myRow);
	$headerDiv.append($headerTable);
	// Create the table element
	var $tableElement = $("<table>").attr("id", "PARTIE-TABLEAU");
	// Insert the data into the table
	LISTEPartie = [];
	for (var k = 0; k < LISTETables[NUM - 1].length; k++) {
		var num = k + 1;
		var maValue = LISTETables[NUM - 1][k];
		var maValue1 = maValue.equipeA;
		var maValue2 = maValue.equipeB;
		LISTEPartie.push([maValue1, maValue2]);
		var $myRow = $("<tr>").addClass("PARTIE-TABLEAU-row");
		if (num % 2 === 0) {
			$myRow.addClass("PARTIE-TABLEAU-row-even");
		} else {
			$myRow.addClass("PARTIE-TABLEAU-row-odd");
		}
		var $col1 = $("<td>").text(num);
		var $col2 = $("<td>").text(maValue1);
		var $col3 = $("<td>").text(maValue2);
		$myRow.append($col1, $col2, $col3);
		$tableElement.append($myRow);
		// Event listeners for row hover and click
		$myRow.on("mouseover", function() {
			$(this).addClass("PARTIE-TABLEAU-row-hover");
		}).on("mouseout", function() {
			$(this).removeClass("PARTIE-TABLEAU-row-hover");
		}).on("click", function() {
			$(this).toggleClass("PARTIE-TABLEAU-row-selected");
			var rowNum = $(this).index(); // Get row number
			displayScore(rowNum);
		});
	}
	// Append the table to the scrollableDiv
	var $scrollableDiv = $("#TABLEAU-TABLES-SCROLL");
	$scrollableDiv.empty(); // Clear previous content
	$scrollableDiv.append($tableElement);
}
//==================================================================
function afficheTableProj(NUM) {
	TOTALRESULTATS = LISTEEquipes.length;
	var $headerDiv = $("#TABLEAU-HEADER-DIV-PROJ");
	$headerDiv.empty(); // Clear previous content
	// Create the header row
	var $myRow = $("<tr>").addClass("PARTIE-TABLE-HEADER-ROW-PROJ");
	var $myCol1 = $("<th>").text("Table");
	var $myCol2 = $("<th>").text("A");
	var $myCol3 = $("<th>").text("B");
	$myRow.append($myCol1, $myCol2, $myCol3);
	// Append the header row to the headerDiv
	var $headerTable = $("<table>").attr("id", "PARTIE-TABLE-HEADER-PROJ").append($myRow);
	$headerDiv.append($headerTable);
	// Create the table element
	var $tableElement = $("<table>").attr("id", "PARTIE-TABLEAU-PROJ");
	// Insert the data into the table
	LISTEPartie = [];
	for (var k = 0; k < LISTETables[NUM - 1].length; k++) {
		var num = k + 1;
		var maValue = LISTETables[NUM - 1][k];
		var maValue1 = maValue.equipeA;
		var maValue2 = maValue.equipeB;
		LISTEPartie.push([maValue1, maValue2]);
		var $myRow = $("<tr>").addClass("PARTIE-TABLEAU-PROJ-row");
		if (num % 2 === 0) {
			$myRow.addClass("PARTIE-TABLEAU-PROJ-row-even");
		} else {
			$myRow.addClass("PARTIE-TABLEAU-PROJ-row-odd");
		}
		var $col1 = $("<td>").text(num);
		var $col2 = $("<td>").text(maValue1);
		var $col3 = $("<td>").text(maValue2);
		$myRow.append($col1, $col2, $col3);
		$tableElement.append($myRow);
		// Event listeners for row hover and click
		$myRow.on("mouseover", function() {
			$(this).addClass("PARTIE-TABLEAU-PROJ-row-hover");
		}).on("mouseout", function() {
			$(this).removeClass("PARTIE-TABLEAU-PROJ-row-hover");
		});
	}
	// Append the table to the scrollableDiv
	var $scrollableDiv = $("#TABLEAU-TABLES-SCROLL-PROJ");
	$scrollableDiv.empty(); // Clear previous content
	$scrollableDiv.append($tableElement);
	$('#TABLEAU-HEADER-TITRE-PROJ').empty().append("<H1>Partie " + PARTIEEnCours + "</H1>");
	setPartieFont();
}
//=======================================================
function createTableEquipes(objetCols) {
	//function createTableEquipes(objetName, objetCols) {
	if (LISTEEquipes.length < 1) {
		var thisData = "<h2>Ce qu'il faut savoir</h2>";
		thisData += "<p>Il faut un minimun de 16 équipes.</p>";
		thisData += "<p>Et un nombre pair d'équipes.</p>";
		thisData += "<p>Numéros et noms apparaîtront ici.</p>";
		thisData += "<p class='hilite1'>Tapez Nom + 2 fois sur ENTREE.</p>";
		thisData += "<p class='hilite2'>Ou cliquez sur le bouton.</p>";
		thisData += "<p>On ne peut pas supprimer d'équipes.</p>";
		thisData += "<p>Cliquez sur un nom pour le modifier.</p>";
		$('#INSCRIPTION-LISTE-DIV').empty().append(thisData);
		$('#INSCRIPTION-LISTE-HEADER').hide();
	} else {
		/*		
		    var tableHeader = '<tr>';
		    var tableBody = '';
		    // Iterate through objetName to create table headers
		    for (var key in objetName) {
		        if (objetCols[key] === 1) {
		            tableHeader += '<th>' + objetName[key] + '</th>';
		        }
		    }
		    tableHeader += '</tr>';
			*/
		// Iterate through LISTEEquipes to create table rows
		var tableBody = '';
		for (var i = 0; i < LISTEEquipes.length; i++) {
			var row = LISTEEquipes[i];
			var teamNum = LISTEEquipes[i].num;
			tableBody += '<tr class="' + (i % 2 === 0 ? 'even' : 'odd') + '" onclick="modifieEquipeNom(' + teamNum + ')" onmouseover="changeRowColor(this)"    onmouseout="restoreRowColor(this)">';
			//tableBody += '<tr  onclick="modifieEquipeNom(' + i + ')">';
			// Iterate through objetCols to include specific columns
			for (var key in objetCols) {
				if (objetCols[key] === 1) {
					if (key == "num") {
						// ajoute un point après num équipe
						tableBody += '<td>' + row[key] + '. </td>';
					} else {
						tableBody += '<td>' + row[key] + '</td>';
					}
				}
			}
			tableBody += '</tr>';
		};
		// Append table header to INSCRIPTION-LISTE-Header
		//  $('#INSCRIPTION-LISTE-HEADER').html('<table id="INSCRIPTION-LISTE-HEADER-TABLE-HEADER">' + tableHeader + '</table>');
		// Append table body to INSCRIPTION-LISTE
		$('#INSCRIPTION-LISTE-DIV').html('<table id="INSCRIPTION-LISTE-TABLE-ID">' + tableBody + '</table>');
	}
}
///////////////////////////////////////////////////////////////////
function afficheEquipesScores() {
	var objetCols = {
		num: 1,
		nom: 1,
		p1: 1,
		p2: 1,
		p3: 1,
		p4: 1,
		total: 1,
		pos: 1
	};
	/*
	var objetName = {
				num: "N°",
				nom: "Nom de l'équipe",
				p1: "Partie 1",
				p2: "Partie 2",
				p3: "Partie 3",
				p4: "Partie 4",
				total: "Total",
				pos: "POS"
	};
	*/
	//createTableScores(objetName, objetCols, "RESULTATS-TABLEAU");
	createTableScores(objetCols, "RESULTATS-TABLEAU");
	toggleSort();
}
//////////////////////////////////////////
function createTableScores(objetCols, WHERE) {
	//function createTableScores(objetName, objetCols) {
	/*
	 var tableHeader = '<tr>';
	 var tableBody = '';  
	 // Iterate through objetName to create table headers
	 for (var key in objetName) {
	 	//console.log("objetName... key: " + key);
	   //console.log("objetCols[key]:" + objetCols[key]);
	     if (objetCols[key] === 1) {
	         tableHeader += '<th>' + objetName[key] + '</th>';
	         //console.log("tableHeader : " + tableHeader);
	     }
	 }
	 tableHeader += '</tr>';
	 **/
	// Iterate through LISTEEquipes to create table rows
	var tableBody = '';
	for (var i = 0; i < LISTEEquipes.length; i++) {
		var row = LISTEEquipes[i];
		var myTeamNum = LISTEEquipes[i].num;
		var value = parseInt(row.pos);
		//	console.log("Valeur: " + value);
		switch (value) {
			case 1:
				tableBody += '<tr class="POS1"';
				break;
			case 2:
				tableBody += '<tr class="POS2"';
				break;
			case 3:
				tableBody += '<tr class="POS3"';
				break;
			default:
				tableBody += '<tr class="' + (i % 2 === 0 ? 'even special-even' : 'odd special-odd') + '"';
				break;
		}
		tableBody += 'onclick="modifieEquipeScore(' + myTeamNum + ')" >';
		// Iterate through objetCols to include specific columns
		for (var key in objetCols) {
			if (objetCols[key] === 1) {
				if (key == "num") {
					// ajoute un point après num équipe
					tableBody += '<td>' + row[key] + '. </td>';
				} else {
					tableBody += '<td>' + row[key] + '</td>';
				}
			}
		}
		tableBody += '</tr>';
	}
	// Append table header to INSCRIPTION-LISTE-Header
	//$('#RESULTATS-TABLEAU-HEADER').html('<table id="RESULTATS-TABLEAU-HEADER-TABLE-HEADER">' + tableHeader + '</table>');
	// Append table body to INSCRIPTION-LISTE
	//  $('#RESULTATS-TABLEAU-DIV').empty().append('<table id="RESULTATS-TABLEAU-TABLE-ID">' + tableBody + '</table>');
	$('#RESULTATS-TABLEAU-DIV-PROJ').empty().append('<table id="SCORES-PROJ">' + tableBody + '</table>');
	setResultatsFont();
}
