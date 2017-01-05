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
        this.game.world.setBounds(0, 0, 3150, 700);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';

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
