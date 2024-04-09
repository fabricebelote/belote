//===================================================
// Fabrice Menoyot - 2024
//====================================================


//===========================================================
function myMsgeBox(data, callback) {
	var type = data[0].type;
	var myClassModal = "";
	var myImgClass = "";
	var myTitleClass = "";
	var myMsgClass = "";
	var myMsgeContainerClass = "";
	var myMsgeBoxInputClass = "";
	var myBtnsClass = "";
	//console.log("Here: " + type);
	switch (type) {
		case 'A':
			myClassModal = "-Alert";
			myImgClass = "-Alert";
			myTitleClass = "-Alert";
			myMsgClass = "-Alert";
			myMsgeContainerClass = "-Alert";
			myMsgeBoxInputClass = "-Alert";
			myBtnsClass = "-Alert";
			break;
		case 'C':
			myClassModal = "-Confirm";
			myImgClass = "-Confirm";
			myTitleClass = "-Confirm";
			myMsgClass = "-Confirm";
			mmyMsgeContainerClass = "-Confirm";
			myMsgeBoxInputClass = "-Confirm";
			myBtnsClass = "-Confirm";
			break;
		case 'P':
			myClassModal = "-Prompt";
			myImgClass = "-Prompt";
			myTitleClass = "-Prompt";
			myMsgClass = "-Prompt";
			myMsgeContainerClass = "-Prompt";
			myMsgeBoxInputClass = "-Prompt";
			myBtnsClass = "-Prompt";
			break;
		case 'SCORE':
			myClassModal = "-Score";
			myImgClass = "-Score";
			myTitleClass = "-Score";
			myMsgClass = "-Score";
			myMsgeContainerClass = "-Score";
			myMsgeBoxInputClass = "-Score";
			myBtnsClass = "-Score";
			break;
		default:
			// Handle other cases if needed
			break;
	}
	var title = data[0].title;
	var message = data[0].msge;
	var btn1Text = data[0].btn1 || "Cancel";
	var btn2Text = data[0].btn2 || "OK";
	var imagePath = data[0].image || "";
	var inputText = data[0].textInput || "";
	var equipe1Name = data[0].equipe1Name || "";
	var score1 = data[0].score1 || "";
	var equipe2Name = data[0].equipe2Name || "";
	var score2 = data[0].score2 || "";
	var approveMe = data[0].approuve || "";
	
	
	
	//console.log(equipe1Name,score1,equipe2Name,score2);
	// Commun à tous 
	
	var $modal = $('<div>').addClass('myMsgeBox-modal');
	if (type === "SCORE") {
   	 $modal.addClass('modalScore');
	}
	var $content = $('<div>').addClass('myMsgeBox-content');
	var $titleContainer = $('<div>').addClass('myMsgeBox-titre-container');
	var $title = $('<h2>').text(title).addClass('myMsgeBox-titre');
	$titleContainer.append($title); // Append the title inside the title container  
	var $imageMessageAsOne = $('<div>').addClass('myMsgeBox-IMG-MSGE-container');
	var $imageContainer = $('<div>').addClass('myMsgeBox-IMG-container');
	var $image = $('<img>').attr('src', imagePath).addClass('myMsgeBox-image');
	$imageContainer.append($image);
	var $messageContainer = $('<div>').addClass('myMsgeBox-msg-container');
	if (type == "SCORE") {
		var $message = $('<H3>').text(message).addClass('myMsgeBox-msgScore-H3');
	} else {
		var $message = $('<H3>').text(message).addClass('myMsgeBox-msg-H3');
	}
	

	$messageContainer.append($message);
	$imageMessageAsOne.append($imageContainer, $messageContainer);
	$content.append($titleContainer, $imageMessageAsOne);
	/* Maintenant les customized */
	if (type === "SCORE") {
		var $scoresContainer = $('<div>').addClass('myMsgeBox-scoreContainer');
		var $scoreEquipe1 = $('<div>').addClass('myMsgeBox-scoreEquipe1');
		var $scoreLabelEq1 = $('<h3>').text(equipe1Name).addClass('myMsgeBox-scoreLabelEq1');
		var $scoreLabelSc1 = $('<h3>').text(score1).addClass('myMsgeBox-scoreLabelEq1');
		$scoreEquipe1.append($scoreLabelEq1, $scoreLabelSc1);
		var $scoreEquipe2 = $('<div>').addClass('myMsgeBox-scoreEquipe2');
		var $scoreLabelEq2 = $('<h3>').text(equipe2Name).addClass('myMsgeBox-scoreLabelEq2');
		var $scoreLabelSc2 = $('<h3>').text(score2).addClass('myMsgeBox-scoreLabelEq2');
		$scoreEquipe2.append($scoreLabelEq2, $scoreLabelSc2);
		$scoresContainer.append($scoreEquipe1, $scoreEquipe2);
		$content.append($scoresContainer);
		var $approuveContainer = $('<div>').addClass('myMsgeBox-approuveContainer');
		var $approuveText = $('<H3>').text(approveMe).addClass('myMsgeBox-msgScores-H3');
		
		//var $approuveText = $('<div>').text(approveMe).addClass('myMsgeBox-approuveText');
		$approuveContainer.append($approuveText);
		$content.append($approuveContainer);
	}
	if (type == "P") {
		var $inputContainer = $('<div>').addClass('myMsgeBox-input-container');
		var input = $('<input>').attr('type', 'text').val(inputText).addClass('myMsgeBox-input');
		input.on('change', function() {
			$('.myMsgeBox-btn2').focus();
		});
		$inputContainer.append(input);
		$content.append($inputContainer);
	}
	if (type === 'A') {
		var $btnsContainer = $('<div>').addClass('myMsgeBox-btns-container' + myBtnsClass);
		var $btn1 = $('<button>').text(btn1Text).addClass('myMsgeBox-btn1' + myBtnsClass);
		var $btn2 = $('<button>').text(btn2Text).addClass('myMsgeBox-btn2' + myBtnsClass);
	} else {
		var $btnsContainer = $('<div>').addClass('myMsgeBox-btns-container');
		var $btn1 = $('<button>').text(btn1Text).addClass('myMsgeBox-btn1');
		var $btn2 = $('<button>').text(btn2Text).addClass('myMsgeBox-btn2');
	}
	if (type === 'A') {
		$btn1.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(true);
		});
		$btnsContainer.append($btn1);
		$content.append($btnsContainer);
	} else if (type === 'C') {
		$btn1.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(false);
		});
		$btn2.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(true);
		});
		$btnsContainer.append($btn1, $btn2);
		$content.append($btnsContainer); // Reversed button order for confirm dialog
	} else if (type === 'SCORE') {
		$btn1.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(false);
		});
		$btn2.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(true);
		});
		$btnsContainer.append($btn1, $btn2);
		$content.append($btnsContainer); // Reversed button order for confirm dialog
	} else if (type === 'P') {
		$btn1.on('click', function() {
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			callback(null);
		});
		$btn2.on('click', function() {
			var value = input.val();
			$modal.remove();
			$('#modalOverlay').hide();
			// $overlay.remove();
			if (value.trim() !== "") {
				callback(value);
			} else {
				callback(false); // Return false if prompt is empty
			}
		});
		$btnsContainer.append($btn1, $btn2);
		$content.append($inputContainer, $btnsContainer); // Reversed button order for confirm dialog
	}
	$modal.append($content);
	$('body').append($modal);
	/*   
	  var $overlay = $('<div>').addClass('myMsgeBox-overlay');
	  $overlay.click(function(event){
	  	console.log("OVERLAY");
	      event.stopPropagation(); // Prevent clicks from reaching elements behind the overlay
	  });
	 // $('body').append($overlay);
	 */
	$('#modalOverlay').show();
	$modal.css('display', 'block');
	$('.myMsgeBox-btn2').focus();
}
// Utilisation
/*
// Function to show alert message box
function testMyAlert() {
    var data = [
        {
            type: 'A',
            title: 'Alert',
            msge: 'This is an alert message to you.',
            image: "DATA/images/alert-2.png"
        }
    ];
    myMsgeBox(data, handleAlertResponse);
}

// Function to show confirm message box
function testMyConfirm() {
    var data = [
        {
            type: 'C',
            title: '  Confirm',
            msge: 'Are you sure you want to proceed?',
                image: "DATA/images/confirm.png"
        }
    ];
    myMsgeBox(data, handleConfirmResponse);
}

function testMyScores() {
var data = [
        {
            type: 'SCORE',
            title: 'Vérifions ces scores :',
            msge: "Est-ce que ces scores sont corrects ?" ,
            btn1: 'Annule',
            btn2: 'Yes boss',
            image: "DATA/images/alert.png",
            equipe1Name: "Equipe : " + equipeA,
            score1: scoreA,
            equipe2Name: "Equipe : " + equipeB,
            score2: scoreB
        }
    ];
    myMsgeBox(data, askForConfirmScoreWAIT);
}


// Function to show prompt message box
function testMyPrompt() {
    var data = [
        {
            type: 'P',
            title: 'Prompt',
            msge: 'Enter some text:',
            btn1: 'Cancel',
            btn2: 'OK',
            image: "DATA/images/prompt-1.png"
        }
    ];
    myMsgeBox(data, handlePromptResponse);
} 
   */
