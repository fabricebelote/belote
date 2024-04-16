//===================================================
// Fabrice Menoyot - 2024
//====================================================

function aboutOutil(callback) {
  var myDataText = `<h3>Comment ça marche ?</h3>

<p>Tout ce qui est nécessaire pour faire fonctionner cet outil est chargé en mémoire dès l’ouverture de cette page. Une fois chargée, l’outil reste fonctionnel même si vous perdez la connexion Internet.</p>

<p>Si vous quittez cette page ou la rechargez, le programme vous demandera si vous voulez restaurer les données en mémoire. Cela vous replacera là où vous étiez.</p>

<p>La page est composée de deux parties : une partie 'Projecteur' qui est utilisée pour présenter les tableaux de répartitions des équipes et les scores ; une partie 'Données' qui vous permet d‘ajouter des équipes et les scores. Chaque partie a sa propre barre d’outils en bas de page.</p>

<p>Une section 'Management' vous permet d’exporter ou d’importer les données du tournoi en un fichier format XML, qui peut être ouvert par un tableur comme Excel ou Libre Calc pour vos archives.</p>

<p>Cet outil contient plusieurs fonctions que j’ai mises au point pour faciliter la création des barres d’outils, des tableaux, des messages d’alerte et la gestion des animations. Ces fonctions peuvent facilement être utilisées pour d’autres projets.</p>

<p>Je vous invite donc à explorer le code et à le réutiliser en partie ou en entier pour vos projets. Vous pouvez aussi assez facilement adapter cet outil pour d’autres types de tournoi de cartes. Envoyez-moi un petit e-mail si vous le faites.</p>

<p>Amicalement,</p>

<p>Fabrice</p>`;



    var $modal = $('<div>').addClass('Outil-modal');
    var $content = $('<div>').addClass('Outil-content');
    var $titleContainer = $('<div>').addClass('Outil-titre-container');
    var $title = $('<h2>').text("Au sujet de cet outil...").addClass('Outil-titre');
    $titleContainer.append($title);

    var $OutilContainer = $('<div>').addClass('Outil-container').append(myDataText);
  // var $outilText = $('<div>').attr('id', 'Outil-TEXT').text(myDataText);
 
    //$OutilContainer.append($outilText);
    $content.append($titleContainer, $OutilContainer);

    var $btnsContainer = $('<div>').addClass('Outil-btns-container');
    var $btn1 = $('<button>').text('OK').addClass('Outil-btn1');

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

    $('.Outil-btn1').focus();
}
