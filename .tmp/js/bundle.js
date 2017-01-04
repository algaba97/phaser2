(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var Direction= {'LEFT':0, 'RIGTH':1, 'NONE':3};
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3};
var party = {enemigo : 0, personaje : 1, entidad: -1};
//entidad
function Entidad(nombre,x,y,party,escena){
  this.sprite = escena.game.add.sprite(x, y, nombre);
  escena.game.physics.arcade.enable(this.sprite);
  this.sprite.anchor.setTo(0.6,0);
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 3300;
  this.sprite.body.gravity.x = 0;
  this.sprite.body.velocity.x = 0;
  this.party = party || party.entidad;

};//Fin de la entidad

function Personaje(x,y,escena){
  Entidad.apply(this, ['enemigo',x, y, party.personaje,escena]);
  this.movimiento = Direction.NONE;
  this.estado = PlayerState.FALLING;
  this.canJump = function(collisionWithTilemap){
    return this.isStanding() && collisionWithTilemap ||this._jamping
  };
  this.isStanding = function(){
    return this.sprite.body.blocked.down || this.sprite.body.touching.down;
  };

  this.mov = function(wasJumping,movement){
    this.movimiento = movement;
    //console.log(wasJumping);
  //  console.log('Player estate',this.estado );
  //  console.log('Player direcion',this.movimiento );
  if(wasJumping){

          this.estado = PlayerState.JUMP;
          this.sprite.body.velocity.y = -900;

        }
  if(this.estado === PlayerState.JUMP && this.sprite.body.velocity.y < 0)
   this.estado = PlayerState.FALLING;
    if(this.movimiento === Direction.NONE){
    this.sprite.body.velocity.x=0;
    }
    else if(this.movimiento === Direction.RIGTH){
      this.sprite.body.velocity.x=300;
       this.sprite.scale.x = -1;
    }
    else if(this.movimiento === Direction.LEFT){
      this.sprite.body.velocity.x=-300;
       this.sprite.scale.x = 1;
    }


  };

};//Fin del personaje
Personaje.prototype = Object.create(Entidad.prototype);
Personaje.prototype.constructor = Personaje;

function Enemigo(x,y,escena,principio,fin){
    Entidad.apply(this, ['enemigo',x, y, party.enemigo,escena]);
    this.principio= principio;
    this.final= fin;
    this.direction= Direction.RIGTH;
    console.log(  this.direction);
    this.sprite.scale.x = -1;
this.update= function(){
  console.log('Posicion',this.sprite.x);
  console.log('Principio',this.principio);
  console.log('Final',this.final);
    if(this.direccion != Direction.NONE)
    {
      if(this.sprite.x < this.principio) {
      this.sprite.scale.x = -1;
        this.direction = Direction.RIGTH;
      }
      else if(this.sprite.x > this.final ){
        console.log("HA llegado a que gire cacho");
     this.sprite.scale.x = 1;
       this.direction = Direction.LEFT;
       console.log(this.direction);
     }
   }

   if(this.direction === Direction.RIGTH)this.sprite.body.velocity.x = 120;
   else if(this.direction === Direction. LEFT)this.sprite.body.velocity.x = -120;
 };
 };//Fin del enemigo
 Enemigo.prototype = Object.create(Entidad.prototype);
 Enemigo.prototype.constructor = Enemigo;


module.exports = {
  Entidad: Entidad,
  Personaje: Personaje,
  Enemigo: Enemigo
};

},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 275, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var texto = this.game.add.text(0, 0, "Reset Game");
        texto.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(texto);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var button2 = this.game.add.button(400, 350, 
                                          'button', 
                                          this.menuOnClick, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var texto2 = this.game.add.text(0, 0, "Return Main Menu");
        texto2.anchor.set(0.5);
        button2.addChild(texto2);

    },
  
    //TODO 7 declarar el callback del boton.
  actionOnClick: function(){
        this.game.state.start('play');
    },
  menuOnClick: function(){
        this.game.state.start('menu');
    }
};

module.exports = GameOver;
},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
var play_scene = require('./play_scene.js');
var gameover_scene = require('./gameover_scene.js');
var menu_scene = require('./menu_scene.js');;


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
      this.game.load.image('tiles','images/nuevo.png');
      this.game.load.atlas('rush', 'images/rush_spritesheet.png','images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
// cargar el enemigo
    this.game.load.image('enemigo','images/enemigo.png');
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
  //TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  game.state.start('boot');
//TODO 1.3 iniciar el state 'boot'.
};

window.onload = function () {
  WebFont.load(wfconfig);
};

},{"./gameover_scene.js":2,"./menu_scene.js":5,"./play_scene.js":6}],4:[function(require,module,exports){
'use strict';
function mapa (JSON, nivel){

  //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
    //Creacion de las layers
    nivel.mapa = nivel.game.add.tilemap(JSON);

    nivel.mapa.addTilesetImage('monsterboy_assets', 'tiles');

      nivel.death = nivel.mapa.createLayer('Death');
      nivel.backgroundLayer = nivel.mapa.createLayer('BackgroundLayer');
      nivel.groundLayer = nivel.mapa.createLayer('GroundLayer');


     nivel.mapa.setCollisionBetween(1, 5000, true, 'Death');
      nivel.mapa.setCollisionBetween(1, 5000, true, 'GroundLayer');
     nivel.death.visible = false;
     nivel.groundLayer.setScale(3,3);
     nivel.backgroundLayer.setScale(3,3);
     nivel.death.setScale(3,3);

     nivel.groundLayer.resizeWorld();
   }

module.exports = {
mapa: mapa
};

},{}],5:[function(require,module,exports){
var MenuScene = {

    create: function () {
          this.game.world.setBounds(0,0,800,600);
          this.game.stage.backgroundColor = "#000000";
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, //Era para que quede mas estetico pero vamos que queda
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY+150, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],6:[function(require,module,exports){
'use strict';
var mapa = require('./mapa');
var entidades = require('./entidades.js');
//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3};
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3};

//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,
    nivel: 'tilemap',  //dirección inicial del player. NONE es ninguna dirección.

    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'

      //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
      this.map = new mapa.mapa(PlayScene.nivel, this);
  //    this._rush = this.game.add.sprite(10,10,'rush');
     this._rush = new entidades.Personaje(10,100, this);
    //  this._rush2 = this.game.add.sprite(100,250,'enemigo');
      this._rush2 = new entidades.Enemigo(100,250,this,100,250);

  //    this._rush.anchor.setTo(0.6, 0);
      //plano de muerte

/*
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.

      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = false;
      //Cambia la escala a x3.
      //en el mapa 3 las escalas son las x2
      //en los demas mapas al x3
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen

    //resize world and adjust to the screen


      //nombre de la animación, frames, framerate, isloop
      this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
                     */
      this.enemys  = new Array();
    this.enemys.push(this._rush2);
      this.configure();


  },
  colision: function() {

    for( var i = 0; i < this.enemys.length; i++){

      if(this.game.physics.arcade.collide(this.enemys[i].sprite, this._rush.sprite)){

      if((this.enemys[i].sprite.y-40 )< this._rush.sprite.y){

         this.onPlayerFell();
      // Habrá que variarlo si cambian el tamaño de los sprites
       }
      else {
//Falta eliminarlo del array
       this.enemys[i].sprite.destroy();
      
       this.enemys.splice(i,1);
        }
      }
    }
  },
    //IS called one per frame.
    update: function () {

      //  var moveDirection = new Phaser.Point(0, 0);


       var collisionWithTilemap = this.game.physics.arcade.collide(this._rush.sprite, this.groundLayer);
       for( var i = 0; i < this.enemys.length; i++){
        this.game.physics.arcade.collide(this.enemys[i].sprite, this.groundLayer);
        this.enemys[i].update();
        //this.game.physics.arcade.collide(this.enemys[i], this._rush);
       }
       //var collisionWithEnemy = this.game.physics.arcade.collide(this._rush2, this.groundLayer);
  //     var marcoantonio = this.game.physics.arcade.collide(this._rush2, this._rush);



        //Va a saltar  cuando este pulsando el boton de saltar(utilizamos la funcion que venia)
    //console.log(this.isJumping(collisionWithTilemap));
        this._rush.mov(this.isJumping(collisionWithTilemap),  this.GetMovement());



             //Cuando va a saltar

        //transitions
        /*
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;

            case PlayerState.JUMP:

                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;

            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;
        }


        //States
        switch(this._playerState){

            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1;
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;
        }

        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
                      */
        this.colision();
        this.checkPlayerFell();
    },



    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        console.log("llega");
        this.game.state.start('gameOver');
        this.destruir();
        console.log("llega mas");

    },

  checkPlayerFell: function(){

        if(this.game.physics.arcade.collide(this._rush.sprite, this.death)){
               //
            this.onPlayerFell();
        }
    },
    isJumping: function(collisionWithTilemap){
        return this._rush.canJump(collisionWithTilemap) &&
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },

    GetMovement: function(){
        var movement = Direction.NONE;
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
      //  this.game.physics.arcade.enable(this._rush);
      //  this.game.physics.arcade.collide(this._rush2, this.groundLayer);
        //this.game.physics.arcade.enable(this._rush2);

      //  this._rush.body.bounce.y = 0.2;
    //    this._rush.body.gravity.y = 3300;
//
    //    this._rush.body.gravity.x = 0;
    //    this._rush.body.velocity.x = 0;
    //    this._rush.x = 10;
      //  for( var i = 0; i < this.enemys.length; i++)this.enemys[i].body.gravity.y = 3000;


      //  this._rush.y = +290;

        this.game.camera.follow(this._rush.sprite);

    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;

        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },

    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destruir:function(){

console.log("llega aun mas");
       this.mapa.destroy();
       this.groundLayer.destroy();
       this.backgroundLayer.destroy();

       this._rush.sprite.destroy();
    }

};

module.exports = PlayScene;

},{"./entidades.js":1,"./mapa":4}]},{},[3]);
