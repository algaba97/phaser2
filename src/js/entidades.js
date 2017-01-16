'use strict';
var Direction= {'LEFT':0, 'RIGTH':1, 'NONE':3};
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3};
var party = {enemigo : 0, personaje : 1, entidad: -1};
//entidad
function Entidad(nombre,x,y,party,escena){
  this.sprite = escena.game.add.sprite(x, y, nombre);
  if(nombre === 'player'){
    this.sprite.animations.add('run',
                    Phaser.Animation.generateFrameNames('package_run',1,3,'',2),5,true);
    this.sprite.animations.add('jump',
                    Phaser.Animation.generateFrameNames('package_jump',1,3,'',2),5,true);
    this.sprite.animations.add('idl',
                    Phaser.Animation.generateFrameNames('package_idl',1,2,'',2),2,true);
  }
  if(nombre === 'flag'){
    this.sprite.animations.add('move',
                    Phaser.Animation.generateFrameNames('flag_move',1,4,'',2),5,true);
    this.sprite.animations.play('move');
  }
  if(nombre === 'enemy'){
    this.sprite.animations.add('move',
                    Phaser.Animation.generateFrameNames('Enemy_move',1,3,'',2),5,true);
    this.sprite.animations.play('move');
  }
  escena.game.physics.arcade.enable(this.sprite);
  this.sprite.anchor.setTo(0.5,0.0);
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 3250;
  this.sprite.body.gravity.x = 0;
  this.sprite.body.velocity.x = 0;
  this.party = party ;

};//Fin de la entidad

function Personaje(x,y,escena){
  Entidad.apply(this, ['player',x, y, party.personaje,escena]);
  
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

  if(wasJumping){
    escena.salto.play();
          this.estado = PlayerState.JUMP;
          this.sprite.body.velocity.y = -900;
          this.sprite.animations.play('jump');
        }
  if(this.sprite.body.velocity.y > 0)
   this.estado = PlayerState.FALLING;
    if(this.movimiento === Direction.NONE){
    this.sprite.body.velocity.x=0;
    this.sprite.animations.play('idl');
    }
    else if(this.estado!= PlayerState.JUMP && this.movimiento === Direction.RIGTH){
      this.sprite.body.velocity.x=300;
       this.sprite.scale.x = 1;
       this.sprite.animations.play('run');
    }
    else if(this.estado != PlayerState.JUMP && this.movimiento === Direction.LEFT){
      this.sprite.body.velocity.x=-300;
       this.sprite.scale.x = -1;
       this.sprite.animations.play('run');
    }
console.log(this.estado)

  };

};//Fin del personaje
Personaje.prototype = Object.create(Entidad.prototype);
Personaje.prototype.constructor = Personaje;

function Enemigo(x,y,escena,principio,fin){
    Entidad.apply(this, ['enemy',x, y, party.enemigo,escena]);
    this.principio= principio;
    this.final= fin;
    this.direction= Direction.RIGTH;
    this.sprite.animations.play('run');
  //  console.log(  this.direction);
    this.sprite.scale.x = -1;
this.update= function(){
//  console.log('Posicion',this.sprite.x);
//  console.log('Principio',this.principio);
//  console.log('Final',this.final);
    if(this.direccion != Direction.NONE)
    {
      if(this.sprite.x < this.principio) {
      this.sprite.scale.x = 1;
        this.direction = Direction.RIGTH;
      }
      else if(this.sprite.x > this.final ){
      //  console.log("HA llegado a que gire cacho");
     this.sprite.scale.x = -1;
       this.direction = Direction.LEFT;
      // console.log(this.direction);
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
