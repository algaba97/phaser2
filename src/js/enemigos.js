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
  escena.game.world.setBounds(200, 0, 3100, 700);
  escena._rush = new entidades.Personaje(250,200, escena);
  escena._bandera = new entidades.Entidad('bandera',3300,300,-1,escena);
  escena.game.camera.follow(escena._rush.sprite);
  escena._rush2 = new entidades.Enemigo(600,350,escena,550,700);
  escena._rush6 = new entidades.Enemigo(800,350,escena,720,800);
  escena._rush3 = new entidades.Enemigo(1000,350,escena,1000,1050);
  escena._rush4 = new entidades.Enemigo(3250,350,escena,3150,3250);
  escena._rush5 = new entidades.Enemigo(2950,350,escena,2850,3000);
  escena.enemys  = new Array();
  escena.enemys.push(escena._rush2);
  escena.enemys.push(escena._rush3);
  escena.enemys.push(escena._rush4);
  escena.enemys.push(escena._rush5);
  escena.enemys.push(escena._rush6);
}
  if(nivel === 3){
    escena.game.state.start('win');
  }
}

module.exports = {
level: level
};
