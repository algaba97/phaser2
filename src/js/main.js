'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
var play_scene = require('./play_scene.js');
var gameover_scene = require('./gameover_scene.js');
var menu_scene = require('./menu_scene.js');
var win = require('./win_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
     // this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";



    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
      this.game.load.tilemap('tilemap','images/mapa2(nuevo).json',null,Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('tilemap2','images/mapa3(nuevo).json',null,Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles','images/nuevo.png');
      this.game.load.atlas('player', 'images/package.png','images/package.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('flag', 'images/flag.png','images/flag.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('soldier', 'images/soldier.png','images/soldier.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
// cargar el enemigo
    this.game.load.image('enemigo','images/enemigo.png');
    this.game.load.image('personaje','images/personaje.png');
    this.game.load.image('bandera','images/bandera.png');
    this.game.load.image('win','images/win.png');
    this.game.load.audio('muerteenemigo', "Musica/muertenemigo.ogg");
    this.game.load.audio('muerteplayer', "Musica/muerteplayer.ogg");
    this.game.load.audio('musica1', "Musica/musica1.ogg");
    this.game.load.audio('musica2', "Musica/musica2.ogg");
    this.game.load.audio('salto', "Musica/salto.ogg");
      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
      this.load.onLoadComplete.add(this.loadComplete,this);

  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },


     //TODO 2.2b function loadComplete()
    loadComplete : function (){
      this.game.state.start('play');
    },

    update : function(){
        this._loadingBar
    }
};


var wfconfig = {

    active: function() {
        console.log("font loaded");
        init();
    },

    google: {
        families: ['Sniglet']
    }

};

//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
function init() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot',BootScene);
  game.state.add('menu',menu_scene);
  game.state.add('preloader',PreloaderScene);
  game.state.add('play',play_scene);
  game.state.add('gameOver',gameover_scene);
  game.state.add('win',win);
  //TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  game.state.start('boot');
//TODO 1.3 iniciar el state 'boot'.
};

window.onload = function () {
  WebFont.load(wfconfig);
};
