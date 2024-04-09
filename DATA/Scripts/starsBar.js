//===================================================
// Fabrice Menoyot - 2024
//====================================================
//=============================================================
function createStarsBox() {
	var itemCount = 4;
	var radioButtonsBar = createRadioButtonsBar('RADIOBTNS-BARCONTAINER-Bar', itemCount);
	$('#PARTIE-BLOCK-TOP').append($('<div>').attr('id', 'RADIOBTNS-BARCONTAINER').append(radioButtonsBar));
	RADIOBTNSP_Load(1);
}
//==============================================================
function RADIOBTNSP_Load(id) {
	for (let i = 1; i <= 4; i++) {
		$("#RADIOBTNS-On-P" + i).hide();
		$("#RADIOBTNS-Off-P" + i).show();
		//$("#RADIOBTNS-Legend-P" + i).css('font-weight', 'normal');
	}
	$("#RADIOBTNS-On-P" + id).show();
	$("#RADIOBTNS-Off-P" + id).hide();
	//$("#RADIOBTNS-Legend-P" + id).css('font-weight', 'bold');
}
//==================================================
function RADIOBTNSPartieClick(image) {
	// pas en usage
	return;
};
//===================================================
// Creates a radio buttons bar with images
//====================================================
/*
var itemCount = 4; // Change this to adjust the number of radio buttons
var radioButtonsBar = createRadioButtonsBar('RADIOBTNS-BARCONTAINER-Bar', itemCount);
$('#MYDESTIN').append($('<div>').attr('id', 'RADIOBTNS-BARCONTAINER').append(radioButtonsBar));
    */
function createRadioButtonsBar(containerId, itemCount) {
	var container = $('<div>').attr('id', containerId).addClass('barContainer');
	for (var i = 1; i <= itemCount; i++) {
		var item = $('<div>').attr('id', 'RADIOBTNS-P' + i).addClass('RADIOBTNSP-Item');
		//var legend = $('<div>').attr('id', 'RADIOBTNS-Legend-P' + i).addClass('RADIOBTNSP-Legend').text(i);
		var onButton = $('<div>').attr('id', 'RADIOBTNS-On-P' + i).addClass('RADIOBTNSP-On');
		var onImg = $('<img>').attr({
			src: 'DATA/images/on.png',
			alt: 'On-' + i,
			//onclick: 'RADIOBTNSPartieClick(this)'
		});
		onButton.append(onImg);
		var offButton = $('<div>').attr('id', 'RADIOBTNS-Off-P' + i).addClass('RADIOBTNSP-Off');
		var offImg = $('<img>').attr({
			src: 'DATA/images/off.png',
			alt: 'Off-' + i,
			//onclick: 'RADIOBTNSPartieClick(this)'
		});
		offButton.append(offImg);
		//item.append(legend, onButton, offButton);
		item.append(onButton, offButton);
		container.append(item);
	}
	return container;
}
//=============================================
function animateStars() {
	var imagesLot = [
		$("#RADIOBTNS-On-P1"),
		$("#RADIOBTNS-On-P2"),
		$("#RADIOBTNS-On-P3"),
		$("#RADIOBTNS-On-P4"),
		$("#RADIOBTNS-Off-P1"),
		$("#RADIOBTNS-Off-P2"),
		$("#RADIOBTNS-Off-P3"),
		$("#RADIOBTNS-Off-P4")
		// Ajoutez d'autres images au besoin
	];
	// Supprimer les animations existantes pour chaque image
	$.each(imagesLot, function() {
		$(this).css('animation', 'none');
		$(this).hide();
	});
	/// Initialize variables
	var selectedImages = [];
	// For each set, pick either "On" or "Off" images based on the selected number
	for (let i = 1; i <= 4; i++) {
		var index = Math.floor(Math.random() * 2) + 1; // Random index to choose "On" or "Off" image
		if (index === 1) {
			// Select "On" image
			selectedImages.push($("#RADIOBTNS-On-P" + i));
		} else {
			// Select "Off" image
			selectedImages.push($("#RADIOBTNS-Off-P" + i));
		}
	}
	// Now you have either 1 or 2 random "On" or "Off" images for each set
	var images = selectedImages;
	$.each(images, function() {
		$(this).show();
	});
	var animations = [{
		animationName: 'doubleAnimation',
		timingFunction: 'linear',
		animations: [{
			animationName: 'zoomInOutX3',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '2'
		}, {
			animationName: 'rotateOnSelf',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '5'
		}]
	}, {
		animationName: 'doubleAnimation',
		timingFunction: 'linear',
		animations: [{
			animationName: 'rotateOnSelf',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '4'
		}, {
			animationName: 'zoomInOutX25',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '1'
		}]
	}, {
		animationName: 'doubleAnimation',
		timingFunction: 'linear',
		animations: [{
			animationName: 'zoomInOutX3',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '2'
		}, {
			animationName: 'rotateOnSelfGauche',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '4'
		}]
	}, {
		animationName: 'doubleAnimation',
		timingFunction: 'linear',
		animations: [{
			animationName: 'rotateOnSelfGauche',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '3'
		}, {
			animationName: 'rotateOnSelf',
			duration: '1s',
			timingFunction: 'linear',
			repetition: '2'
		}]
	}];
	var promises = [];
	for (var i = 1; i <= 4; i++) { // Loop through images
		var element = images[i - 1];
		var randomAnimation = animations[Math.floor(Math.random() * animations.length)];
		promises.push(animeSpecialStars(element, randomAnimation.animations));
	}
	// Wait for all animations to finish
	Promise.all(promises).then(function() {
		// Execute the desired task when all animations are completed
		// console.log('All animations are finished. Do something now.');
		// Trigger RADIOBTNSP_Load with appropriate parameter
		RADIOBTNSP_Load(PARTIEEnCours);
	});
}
// Modified animeSpecialStars to return a promise
function animeSpecialStars(element, animations) {
	return new Promise(function(resolve) {
		// Remove existing animations
		element.css('animation', 'none');
		// Construct new animation string
		let animationString = '';
		animations.forEach(animation => {
			animationString += `${animation.animationName} ${animation.duration || '2s'} ${animation.timingFunction} ${animation.repetition || ''}, `;
		});
		// Remove trailing comma
		animationString = animationString.slice(0, -2);
		// Apply new animations
		setTimeout(function() {
			element.css('animation', animationString);
			// Resolve the promise when all animations are completed
			element.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
				// console.log('Animation ended for element:', element.attr('id'));
				resolve();
			});
		}, 10); // Adding a slight delay to ensure proper reset
	});
}
