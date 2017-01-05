'use strict';
function mapa (JSON, nivel){

  //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
    //Creacion de las layers
    nivel.mapa = nivel.game.add.tilemap(JSON);

    nivel.mapa.addTilesetImage('monsterboy_assets', 'tiles');

      nivel.death = nivel.mapa.createLayer('Death');
      nivel.backgroundLayer = nivel.mapa.createLayer('BackgroundLayer');
      nivel.groundLayer = nivel.mapa.createLayer('GroundLayer');


     nivel.mapa.setCollisionBetween(1, 10000, true, 'Death');
     nivel.mapa.setCollisionBetween(1, 10000, true, 'GroundLayer');
     nivel.death.visible = false;
     nivel.groundLayer.setScale(2.2,2.2);
     nivel.backgroundLayer.setScale(2.2,2.2);
     nivel.death.setScale(2.2,2.2);

     nivel.groundLayer.resizeWorld();
   }

module.exports = {
mapa: mapa
};