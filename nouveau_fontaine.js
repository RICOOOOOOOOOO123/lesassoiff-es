let carte;
let monCanvas;

let titreEcran = "Les assoiffé.es";

let policeTitre;
let tailleTitre = 50;

let margeTitre = 15;


// TEXTE EXPLICATIF EN BAS À DROITE

let texteEcran =
  "Appuie sur les robinets pour écouter, zoom avec la molette et déplace toi en cliquant sur la carte";

let policeTexte = "arial";
let tailleTexte = 18;


// Largeur du bloc de texte
let largeurTexte = 450;

// Marge par rapport au bord droit et au bord bas
let margeTexteDroite = 30;
let margeTexteBas = -80;

// Hauteur maximale du bloc
let hauteurTexte = 250;

// Espace entre les lignes
let interligneTexte = 1.25;
// =============================
// ROBINETS
// =============================

// Tous les robinets sont stockés ici
let robinets = [];


// Fonction pour ajouter un robinet
//
// fichierNormal = image quand le robinet est éteint
// fichierActif = image quand le robinet est allumé
// fichierSon = son associé
// x / y = position sur la carte
// largeur = largeur d'affichage

function ajouterRobinet(
  fichierNormal,
  fichierActif,
  fichierSon,
  x,
  y,
  largeur
) {

  let robinet = {

    imageNormal: loadImage(fichierNormal),

    imageActif: loadImage(fichierActif),

    // Le son n'est PAS chargé au démarrage
    son: null,

    // On garde simplement le nom du fichier
    fichierSon: fichierSon,

    x: x,
    y: y,

    largeur: largeur,

    actif: false,

    sonCharge: false
  };

  robinets.push(robinet);
}


// =============================
// IMAGES DE LA CARTE
// =============================

let imagesCarte = [];


// Fonction pour ajouter une image
//
// fichier = nom du fichier
// x / y = position sur la carte
// largeur = largeur d'affichage
//
// La hauteur est calculée automatiquement.

function ajouterImage(
  fichier,
  x,
  y,
  largeur
) {

  let img = loadImage(
    fichier,

    function(imageChargee) {

      console.log(
        "Image chargée :",
        fichier,
        imageChargee.width,
        "x",
        imageChargee.height
      );

      imagesCarte.push({

        image: imageChargee,

        x: x,
        y: y,

        largeur: largeur
      });
    },

    function(error) {

      console.error(
        "ERREUR DE CHARGEMENT :",
        fichier,
        error
      );
    }
  );
}


// =============================
// TEXTES DE LA CARTE
// =============================

let textesCarte = [];


// Fonction pour ajouter un texte
//
// contenu = texte à afficher
// type = "titre", "sousTitre" ou "texte"
// x / y = position sur la carte

function ajouterTexte(
  contenu,
  type,
  x,
  y
) {

  textesCarte.push({

    contenu: contenu,

    type: type,

    x: x,
    y: y
  });
}


// =============================
// CARTE
// =============================

const CARTE_LARGEUR = 1738;
const CARTE_HAUTEUR = 1080;

let offsetX = 0;
let offsetY = 0;
let zoom = 1;


// =============================
// SOURIS
// =============================

let dragging = false;

let lastMouseX = 0;
let lastMouseY = 0;


// =============================
// PRELOAD
// =============================

function preload() {
  policeTitre = loadFont("brlnsdb.ttf");
}


// =============================
// SETUP
// =============================

function setup() {

  monCanvas = createCanvas(
    windowWidth,
    windowHeight
  );

  monCanvas.elt.style.position = "absolute";
  monCanvas.elt.style.left = "0px";
  monCanvas.elt.style.top = "0px";
  monCanvas.elt.style.zIndex = "100";


  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.background = "#e6fffb";


  // =============================
  // CARTE SVG
  // =============================

  carte = createImg("carte3.svg");

  carte.attribute(
    "draggable",
    "false"
  );

  carte.style(
    "position",
    "absolute"
  );

  carte.style(
    "pointer-events",
    "none"
  );

  carte.style(
    "z-index",
    "1"
  );


  // =============================
  // POSITION INITIALE
  // =============================


  zoom = 5;

  offsetX =
    (width - CARTE_LARGEUR * zoom) / 2
    -2100;

  offsetY =
    (height - CARTE_HAUTEUR * zoom) / 2
    -1100;

  updateCarte();
  // ==========================================================================================================================================================================================================================================================
  // IMAGES DE LA CARTE
  // ========================================================================================================================================================================================================

  ajouterImage(
    "illu1.jpg",
    1217,
    504,
    94
   
  );

  ajouterImage(
    "barriere1.jpg",
    1115,
    541,
    45
  );
  
    ajouterImage(
    "barriere2.jpg",
    930,
    624,
    65
  );

 ajouterImage(
    "illu3.jpg",
    645,
    636,
    94
  );
  
  ajouterImage(
    "porte1.jpg",
    585,
    722,
    65
  );
  
    ajouterImage(
    "rue2.jpg",
   133,
    522,
    65
  );

   ajouterImage(
    "reservoir2.jpg",
   408,
    488,
    33
  );
    ajouterImage(
    "reservoir1.jpg",
   441,
    435,
    66
  );
  
     ajouterImage(
    "tuyau1.jpg",
   402,
    397,
    33
  );

    ajouterImage(
    "illu5.jpg",
   412,
    288,
    95
  );
  
      ajouterImage(
    "pre.jpg",
   689,
    432,
    65
  );
  
  ajouterImage(
    "illu2.jpg",
   1010,
    264,
    73
  );
  
    ajouterImage(
    "bouee.jpg",
   879,
    364,
    31
  );
  
   ajouterImage(
    "barre1.jpg",
   911,
    364,
    31
  );

 ajouterImage(
    "tuyau2.jpg",
   691,
    209,
    65
  );
  
  ajouterImage(
    "illu4.jpg",
   600,
    144,
    95
  );
  
   ajouterImage(
    "rue1.jpg",
   763,
    120,
    32
  );
  
   ajouterImage(
    "lettre1.jpg",
   1323,
    502,
    33
  );
  
  ajouterImage(
    "lettre2.jpg",
   1323,
    526,
    33
  );
  
  ajouterImage(
    "lettre3.jpg",
   1323,
    550,
    33
  );

  ajouterImage(
    "aquarelle.jpg",
   1358,
    502,
    53
  );
  
    ajouterImage(
    "tel.jpg",
   1256,
    700,
    32
  );
  
  ajouterImage(
    "panneau.jpg",
   1289,
    700,
    32
  );
  
    ajouterImage(
    "jardin.jpg",
   1256,
    744,
    65
  );

  // ========================================================================================================================================================================================================
  // ROBINETS
  // ========================================================================================================================================================================================================

  ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "10visitebatiment.wav",
    648,
    714,
    30
  );

  ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "1vieux.wav",
    1263,
    572,
    30
  );
  
    ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "7dessin.wav",
    1237,
    572,
    30
  );
  
   ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "3explication.wav",
    1288,
    572,
    30
  );
  
    ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "4tel.wav",
    1320,
    697,
    30
  );
  
      ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "5vieuxcompil.wav",
    1159,
    535,
    30
  );
  
        ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "2truite.wav",
    1159,
    553,
    30
  );
  
       ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "6histoire.wav",
    1410,
    498,
    30
  );
  
      ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "8chanson.wav",
    1211,
    602,
    30
  );
  
   ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "11gestionsites.wav",
    738,
    630,
    30
  );
  
  ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "12depotage.wav",
    648,
    733,
    30
  );
  
  ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "13porteurdeau.wav",
    440,
    484,
    30
  );
  
  ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "14capteur.wav",
    694,
    142,
    30
  );
  

  
     ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "16.wav",
   941,
    365,
    30
  );
  
       ajouterRobinet(
    "robinette.png",
    "robinette2.png",
    "15ambiance.wav",
  755,
    206,
    30
  );
  


  // ==================================================
  // TEXTES
  // ==================================================

 

}


// =============================
// DRAW
// =============================

function draw() {

  clear();

  push();

  translate(
    offsetX,
    offsetY
  );

  scale(zoom);


  // =============================
  // IMAGES
  // =============================

  for (
    let objet of imagesCarte
  ) {

    let img = objet.image;


    // Ratio original
    let ratio =
      img.height / img.width;


    // Hauteur automatique
    let hauteur =
      objet.largeur * ratio;


    image(
      img,

      objet.x,
      objet.y,

      objet.largeur,
      hauteur
    );
  }


  // =============================
  // ROBINETS
  // =============================

  for (
    let robinet of robinets
  ) {

    let img;


    if (robinet.actif) {

      img =
        robinet.imageActif;

    } else {

      img =
        robinet.imageNormal;
    }


    if (img) {

      // Ratio original
      let ratio =
        img.height / img.width;


      // Hauteur automatique
      let hauteur =
        robinet.largeur * ratio;


      image(
        img,

        robinet.x,
        robinet.y,

        robinet.largeur,
        hauteur
      );
    }
  }


  // =============================
  // TEXTES
  // =============================

  for (
    let texte of textesCarte
  ) {

    push();


    // -----------------------------
    // STYLE SELON LE TYPE
    // -----------------------------

    if (texte.type === "titre") {

      textSize(50);
      textStyle(BOLD);

    }

    else if (texte.type === "sousTitre") {

      textSize(30);
      textStyle(BOLD);

    }

    else {

      textSize(18);
      textStyle(NORMAL);
    }


    // -----------------------------
    // STYLE GÉNÉRAL
    // -----------------------------

    fill(0);

    textAlign(
      LEFT,
      TOP
    );


    // -----------------------------
    // AFFICHAGE
    // -----------------------------

    text(
      texte.contenu,
      texte.x,
      texte.y
    );


    pop();
  }
  
    // =============================
  // COORDONNÉES DU CURSEUR
  // =============================

 


   pop();


  // ==================================================
  // TEXTES FIXES DE L'ÉCRAN
  // ==================================================

  // Ces textes sont volontairement placés
  // APRÈS le pop() de la carte.
  // Ils ne suivent donc ni le zoom ni le déplacement.


  // =============================
  // TITRE EN HAUT À GAUCHE
  // =============================

  push();

  fill(0);
  noStroke();

  textFont(policeTitre);
  textSize(tailleTitre);
  textStyle(BOLD);

  textAlign(LEFT, TOP);

  text(
    titreEcran,
    margeTitre,
    margeTitre
  );

  pop();


  // =============================
  // TEXTE EN BAS À DROITE
  // =============================

   push();

  fill(0);
  noStroke();

  textFont(policeTexte);
  textSize(tailleTexte);
  textStyle(NORMAL);

  textAlign(RIGHT, TOP);

text(
  texteEcran,
  width - margeTexteDroite - largeurTexte,
  height - margeTexteBas - 150,
  largeurTexte,
  150
);

  pop();
}


// =============================
// CARTE
// =============================

function updateCarte() {

  carte.position(
    offsetX,
    offsetY
  );

  carte.size(

    CARTE_LARGEUR * zoom,

    CARTE_HAUTEUR * zoom

  );
}


// =============================
// CLIC
// =============================

function mousePressed() {

  // Réveille l'audio dès le premier clic sur le site
  userStartAudio();

  let worldX =
    (mouseX - offsetX) / zoom;

  let worldY =
    (mouseY - offsetY) / zoom;


  // =============================
  // ROBINETS
  // =============================

  for (
    let i = robinets.length - 1;
    i >= 0;
    i--
  ) {

    let robinet =
      robinets[i];

    let img =
      robinet.imageNormal;

    if (robinet.actif) {
      img = robinet.imageActif;
    }

    if (img) {

      let ratio =
        img.height / img.width;

      let hauteur =
        robinet.largeur * ratio;

      if (

        worldX >= robinet.x &&

        worldX <=
          robinet.x +
          robinet.largeur &&

        worldY >= robinet.y &&

        worldY <=
          robinet.y +
          hauteur

      ) {

        toggleRobinet(robinet);

        dragging = false;

        return;
      }
    }
  }


  // =============================
  // DÉPLACEMENT DE LA CARTE
  // =============================

  dragging = true;

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// =============================
// ROBINET ON / OFF
// =============================
function toggleRobinet(robinet) {

  userStartAudio();

  // =============================
  // SI LE ROBINET EST DÉJÀ ACTIF
  // =============================

  if (robinet.actif) {

    robinet.actif = false;

    if (robinet.son && robinet.son.isPlaying()) {
      robinet.son.stop();
    }

    return;
  }


  // =============================
  // PREMIER CLIC :
  // CHARGEMENT DU SON
  // =============================

  if (!robinet.sonCharge) {

    robinet.actif = true;

    robinet.son = loadSound(
      robinet.fichierSon,

      // Quand le son est chargé
      function() {

        robinet.sonCharge = true;

        robinet.son.play();

        robinet.son.onended(function() {
          robinet.actif = false;
        });

      },

      // Erreur de chargement
      function(error) {

        console.error(
          "Impossible de charger le son :",
          robinet.fichierSon,
          error
        );

        robinet.actif = false;
      }
    );

  }

  // =============================
  // CLIC SUIVANT :
  // SON DÉJÀ CHARGÉ
  // =============================

  else {

    robinet.actif = true;

    robinet.son.play();

    robinet.son.onended(function() {
      robinet.actif = false;
    });

  }
}

// =============================
// DRAG
// =============================

function mouseDragged() {

  if (dragging) {

    let dx =
      mouseX - lastMouseX;

    let dy =
      mouseY - lastMouseY;


    offsetX += dx;
    offsetY += dy;


    lastMouseX = mouseX;
    lastMouseY = mouseY;


    updateCarte();
  }
}


// =============================
// RELEASE
// =============================

function mouseReleased() {

  dragging = false;
}


// =============================
// ZOOM
// =============================

function mouseWheel(event) {

  let oldZoom = zoom;


  if (event.delta < 0) {

    zoom *= 1.1;

  } else {

    zoom /= 1.1;
  }


  zoom = constrain(
    zoom,
    0.1,
    10
  );


  let worldX =
    (mouseX - offsetX) /
    oldZoom;

  let worldY =
    (mouseY - offsetY) /
    oldZoom;


  offsetX =
    mouseX -
    worldX * zoom;

  offsetY =
    mouseY -
    worldY * zoom;


  updateCarte();


  return false;
}


// =============================
// RESIZE
// =============================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  updateCarte();
}
