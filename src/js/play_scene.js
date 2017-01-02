'use strict';
var mapa = require('./mapa');
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
      this._rush = this.game.add.sprite(10,10,'rush');
      this._rush2 = this.game.add.sprite(100,250,'enemigo');

      this._rush.anchor.setTo(0.5, 0);
      //plano de muerte


      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
    //resize world and adjust to the screen

      //nombre de la animación, frames, framerate, isloop
      this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      this.enemys  = new Array();
    this.enemys.push(this._rush2);
      this.configure();


  },
  colision: function() {

    for( var i = 0; i < this.enemys.length; i++){

      if(this.game.physics.arcade.collide(this.enemys[i], this._rush)){
        console.log(this.enemys[i].y);
        console.log(this._rush.y);
      if((this.enemys[i].y-40 )< this._rush.y){
        console.log("1");
         this.onPlayerFell();
      // Habrá que variarlo si cambian el tamaño de los sprites
       }
      else {
        console.log("2");
       this.enemys[i].destroy();
        }
      }
    }
  },
    //IS called one per frame.
    update: function () {

      //  var moveDirection = new Phaser.Point(0, 0);


       var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
       for( var i = 0; i < this.enemys.length; i++){
        this.game.physics.arcade.collide(this.enemys[i], this.groundLayer);
        this.game.physics.arcade.collide(this.enemys[i], this._rush);
       }
       //var collisionWithEnemy = this.game.physics.arcade.collide(this._rush2, this.groundLayer);
  //     var marcoantonio = this.game.physics.arcade.collide(this._rush2, this._rush);
        var movement = this.GetMovement();
        //Va a saltar  cuando este pulsando el boton de saltar(utilizamos la funcion que venia)
        if(this.isJumping(collisionWithTilemap)){
          this._playerState = PlayerState.JUMP;
          this._rush.animations.play('jump');
          this._rush.body.velocity.y = -900;

        }
          if(this.isStanding(collisionWithTilemap))this._playerState = PlayerState.RUN;
          else if(this._playerState == PlayerState.JUMP && this._rush.body.velocity.y < 0)this._playerState = PlayerState.FALLING;

        // Cuando está parado sobre un terreno apoyado
            if(movement === Direction.NONE  && this._playerState != PlayerState.JUMP  ){
              this._rush.body.velocity.x = 0;


              this._rush.animations.play('stop');
            }
            // Cuando anda hacia la derecha sobre plano
            else if (movement === Direction.RIGHT && this._playerState != PlayerState.JUMP )  {
               this._rush.body.velocity.x = 300;

            //  this._rush.pivot.x =10;
               this._rush.scale.x = 1;
               this._rush.animations.play('run');
             }
             // Cuando anda hacia la izq sobre un plano
             else if (movement === Direction.LEFT && this._playerState != PlayerState.JUMP )  {
               this._rush.body.velocity.x = -300;
              //   this._rush.pivot.x =   10;
                 this._rush.scale.x = -1;
               this._rush.animations.play('run');
             }

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


    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        console.log("llega");
        this.game.state.start('gameOver');
        this.destruir();
        console.log("llega mas");

    },

  checkPlayerFell: function(){

        if(this.game.physics.arcade.collide(this._rush, this.death)){
               //
            this.onPlayerFell();
        }
    },

    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },

    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) &&
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },

    GetMovement: function(){
        var movement = Direction.NONE
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
        this.game.physics.arcade.enable(this._rush);
        this.game.physics.arcade.collide(this._rush2, this.groundLayer);
        this.game.physics.arcade.enable(this._rush2);

        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 3300;

        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this._rush.x = 10;
        for( var i = 0; i < this.enemys.length; i++)this.enemys[i].body.gravity.y = 300;


      //  this._rush.y = +290;

        this.game.camera.follow(this._rush);

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

       this._rush.destroy();
    }

};

module.exports = PlayScene;
