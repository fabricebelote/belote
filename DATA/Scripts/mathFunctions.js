//===================================================
// Fabrice Menoyot - 2024
//====================================================

// Fonction pour vérifier si un nombre est pair
function estPair(nombre) {
	return nombre % 2 === 0;
};
/*
if (estPair(number)) {
    console.log(number + " is odd.");
} else {
    console.log(number + " is even.");
}
*/
//========================================================================
function trouvePartieEncours(ArrayObj) {
	// Calculate the total of columns p1, p2, p3, and p
	var sumP1 = 0;
	var sumP2 = 0;
	var sumP3 = 0;
	var sumP4 = 0;
	ArrayObj.forEach(function(obj) {
		sumP1 += obj.p1;
		sumP2 += obj.p2;
		sumP3 += obj.p3;
		sumP4 += obj.p4;
	});
	// Find the first column with a total of 0
	var firstZeroCol = 0;
	if (sumP1 === 0) {
		firstZeroCol = 1;
	} else if (sumP2 === 0) {
		firstZeroCol = 2;
	} else if (sumP3 === 0) {
		firstZeroCol = 3;
	} else if (sumP4 === 0) {
		firstZeroCol = 4;
	} else {
		firstZeroCol = 5;
	}
	// Output the total and the first column with a total of 0
	//  console.log("Inscrits: " + LISTEEquipes.length);
	//console.log("First column with total of 0: " + firstZeroCol);
	return (firstZeroCol - 1);
}
//========================================================================
function countP1Zero(partie) {
	// Initialize a counter variable to keep track of the count
	var count = 0;
	var propName = partie.toLowerCase(); // Convert field to lowercase 
	// Loop through each object in the LISTEEquipes array
	for (var i = 0; i < LISTEEquipes.length; i++) {
		// Check if the value of p1 property in the current object is 0
		if (LISTEEquipes[i][propName] === 0) {
			// If p1 equals 0, increment the counter
			count++;
		}
	}
	// Return the count of occurrences where p1 equals 0
	return count;
}
//========================================================================
// Fonction pour calculer le total de p1, p2, p3, p4 et stocker le résultat dans l'objet total
function calculateTotal() {
	LISTEEquipes.forEach(item => {
		item.total = item.p1 + item.p2 + item.p3 + item.p4;
		//console.log("item.total: " + item.total);
	});
}
//============================
// Fonction pour vérifier si l'un des p1, p2, p3, p4 est égal à 0
function checkZero() {
	return LISTEEquipes.some(item => item.p1 === 0 || item.p2 === 0 || item.p3 === 0 || item.p4 === 0);
}
//============================
function sortPosition(what) {
	console.log("sortPosition... " + what);
	if (what == "A") {
		sortAscending();
		sortDown = false;
	} else {
		sortDescending();
		sortDown = true;
	}
	// referesh la table.
	afficheEquipesScores();
}

function sortAscendingTeam() {
	LISTEEquipes.sort((a, b) => a.num - b.num);
}

function sortDescendingTeam() {
	LISTEEquipes.sort((a, b) => b.num - a.num);
}
// Fonction pour trier numériquement descendant l'objet total
function sortDescending() {
	LISTEEquipes.sort((a, b) => b.total - a.total);
}
//============================
// Fonction pour trier numériquement ascendant l'objet total
function sortAscending() {
	LISTEEquipes.sort((a, b) => a.total - b.total);
}
//============================
function returnScore(id) {
	var scoresEquipe = [];
	// Loop through each row of the LISTEEquipes array
	LISTEEquipes.forEach(function(equipe) {
		// Loop through each element of the current row
		for (var key in equipe) {
			if (key == "num") {
				if (equipe[key] == id) {
					//  console.log("equipe trouvée");
					// console.log("equipe[p1]: " + equipe["p1"]);
					scoresEquipe.push(equipe["p1"], equipe["p2"], equipe["p3"], equipe["p4"]);
				}
			}
		}
	});
	return scoresEquipe;
}
///////////////////////////////////////////////////////////////////////////
// Fonction pour vérifier les doublons dans l'objet LISTEEquipes
function findDuplicate(name) {
	return LISTEEquipes.some(item => item.nom === name);
}
//========================================================================
function calculatePosition() {
	// Sort the array based on the "total" field in descending order
	LISTEEquipes.sort((a, b) => b.total - a.total);
	// Iterate through the sorted array and update the 'pos' field accordingly
	for (let i = 0; i < LISTEEquipes.length; i++) {
		LISTEEquipes[i].pos = i + 1; // Position starts from 1
	}
	//console.log("calculatePosition... fait ");
	return true;
}
