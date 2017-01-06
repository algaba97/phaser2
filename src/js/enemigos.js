'use strict';
var mapa = require('./mapa');
var entidades = require('./entidades.js');

function level (nivel,escena){


  escena.mapa.destroy();
  escena.groundLayer.destroy();
  escena.backgroundLayer.destroy();
  for( var i = 0; i < escena.enemys.length; i++){
   escena.enemys[i].sprite.destroy();
  }
  escena._rush.sprite.destroy();
  escena._bandera.sprite.destroy();

  if(nivel === 2){

  escena.map = new mapa.mapa('tilemap2', escena);
  escena._rush = new entidades.Personaje(10,200, escena);
  escena._bandera = new entidades.Entidad('bandera',450,300,-1,escena);
  escena.game.camera.follow(escena._rush.sprite);
}
  if(nivel === 3)escena.game.state.start('gameOver');
}

module.exports = {
level: level
};
