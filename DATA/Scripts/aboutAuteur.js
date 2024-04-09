//===================================================
// Fabrice Menoyot - 2024
//====================================================

function aboutAuthor(callback) {
    var nom = "Fabrice Menoyot";
    var email = "fabricemenoyot@gmail.com";
    var text1 = "J’ai créé cet outil pour aider mes amis du Comité des Fêtes de Feuguerolles Bully (14).";
    var text2 = "Le code est libre et vous pouvez distribuer gratuitement cet outil à qui en a besoin.";
    var text3 = "Tous les graphics viennent du site: Trainee Iconpack - iconarchive.com. Sauf la table et la main que j'ai créées avec l'aide d'une IA.";
    var dateText = "Feuguerolles Bully - 2024";
    var myImage = "DATA/images/village.png";

    var $modal = $('<div>').addClass('Auteur-modal');
    var $content = $('<div>').addClass('Auteur-content');
    var $titleContainer = $('<div>').addClass('Auteur-titre-container');
    var $title = $('<h2>').text("Au sujet de l'auteur...").addClass('Auteur-titre');
    $titleContainer.append($title);

    var $auteurContainer = $('<div>').addClass('Auteur-container');
    var $authorName = $('<div>').attr('id', 'Auteur-NOM').text(nom);
    var $authorEmail = $('<div>').attr('id', 'Auteur-EMAIL').text(email);
    $auteurContainer.append($authorName, $authorEmail);

    var $textContainer = $('<div>').addClass('Auteur-text-container');
    var $introText1 = $('<div>').attr('id', 'Auteur-TEXT-1').text(text1);
    var $introText2 = $('<div>').attr('id', 'Auteur-TEXT-2').text(text2);
    var $introText3 = $('<div>').attr('id', 'Auteur-TEXT-3').text(text3);
    $textContainer.append($introText1, $introText2, $introText3);

    var $dateSection = $('<div>').attr('id', 'Auteur-DATE').text(dateText);
  var $imageContainer = $('<div>').addClass('Auteur-IMG-container');
    var $image = $('<img>').attr('src', myImage).addClass('Auteur-image');
    $imageContainer.append($image);
    $content.append($titleContainer, $auteurContainer, $textContainer, $imageContainer, $dateSection);

    var $btnsContainer = $('<div>').addClass('Auteur-btns-container');
    var $btn1 = $('<button>').text('OK').addClass('Auteur-btn1');

    $btn1.on('click', function() {
        $modal.remove();
       $('#modalOverlay').hide();
       // $overlay.remove();
       //callback(true);
    });
    $btnsContainer.append($btn1);
    $content.append($btnsContainer);

    $modal.append($content);
    $('body').append($modal);
    /*
    var $overlay = $('<div>').addClass('myMsgeBox-overlay');
    $overlay.click(function(event) {
        event.stopPropagation();
    });
    $('body').append($overlay);
    */
    $('#modalOverlay').show();
    $modal.css('display', 'block');

    $('.Auteur-btn1').focus();
}
