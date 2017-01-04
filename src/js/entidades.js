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
