'use strict';
var Direction = {'LEFT':-1, 'RIGHT':1, 'NONE':0};
var playerSpeed = 150;
//DEFINICION DE OBJETOS DE LA ESCENA
//Bandos del juego. Enemigos, heroe e indefinido para errores.
var party = {enemy : 0, hero : 1, undefined: -1};
var jumpTimer = 0;
//Clase base para desarrollar el resto de personajes
function Character(x, y, party, name, lifes, spritename, escene){
  this.sprite = escene.game.add.sprite(x, y, spritename);
  //Cambiamos el ancla del sprite al centro.
  this.sprite.anchor.setTo(0.5,0);
  this.startposition = {x:x, y:y} || {x:0, y:0};
  this.name = name || 'name not defined';
  this.lifes = lifes || 0;
  this.party = party || party.undefined;
  escene.game.physics.arcade.enable(this.sprite);
  Character.prototype.moveX =  function (dir) {
    switch (dir) {
      case Direction.RIGHT:
        this.sprite.body.velocity.x = playerSpeed;
        break;
      case Direction.LEFT:
        this.sprite.body.velocity.x = -playerSpeed;
        break;
      case Direction.NONE:
        this.sprite.body.velocity.x = 0;
        break;
      default:
    }
  };
}
//Rey, que hereda de Character y se mueve y salta conforme al input del usuario
function King (x, y, escene){
  //TODO CAMBIAR EL SPRITE AÑADIDO.
  Character.apply(this, [x, y, party.hero, 'King', 100, 'einstein', escene]);
  var self = this;
  this.sprite.body.allowgravity = false;
  King.prototype.update = function () {
    var dir = this.getInput();
    //TODO CAmbiar el update. Si se pulsa una tecla, se llama al método. Si no
    //no se le llama
    if(dir!== 0)this.sprite.scale.x = dir;
    Character.prototype.moveX.call(this, dir);
    //console.log('velocidad en y: ', this.sprite.body.velocity.y);
  };
  King.prototype.getInput = function () {
    var movement = Direction.NONE;
    //Move Right
    if(escene.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) movement = Direction.RIGHT;
    else if(escene.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) movement = Direction.LEFT;

    if(escene.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
    this.jump();
  }
    return movement;

  };
  King.prototype.jump = function (){
    console.log(escene._player.sprite.body.onFloor());
    if(escene._player.sprite.body.touching.down){
      this.sprite.body.velocity.y = -750;

    }
  };
  King.prototype = Object.create(Character.prototype);
  King.prototype.constructor = King;
}
//Enemy, clase base para enemigos. Si tocan al rey le hacen daño.
function Enemy (name, x ,y ,vidas, danyo, spriteName) {
    Character.apply(this, [x, y,party.enemy,name,vidas, spriteName]);
    this.danyo = danyo || 0;
    Enemy.prototype = Object.create(Character.prototype);
    Enemy.prototype.constructor = Enemy;

}
//Serpiente, hereda de enemy y se mueve a izquierda y derecha
function Serpiente(x, y){
  Enemy.apply(this, ['Serpiente',x, y, 1, /*Nombre de sprite*/]);
  Serpiente.prototype = Object.create(Enemy.prototype);
  Serpiente.prototype.constructor = Serpiente;
}
//Golem, enemigo final del juego.
function Golem(x, y){
  Enemy.apply(this, ['Golem',x, y, 15]);
  Golem.prototype = Object.create(Enemy.prototype);
  Golem.prototype.constructor = Golem;
}

module.exports = {
  King: King,
  Serpiente: Serpiente,
  Golem: Golem
};
