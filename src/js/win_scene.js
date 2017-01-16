var win = {
    create: function () {
  this.musica2.loopFull();
  this.musica2 = this.game.add.audio('musica2');
  this.musica2.loopFull();

        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var goText = this.game.add.text(600, 100, "¡Has Ganado!");
        var button2 = this.game.add.button(600, 350,
                                          'button',
                                          this.menuOnClick,
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var texto2 = this.game.add.text(0, 0, "Main Menu");
        texto2.anchor.set(0.5);
        button2.addChild(texto2);

    },

    //TODO 7 declarar el callback del boton.
  menuOnClick: function(){
        this.game.state.start('menu');
        this.musica2.destroy();
    }
};

module.exports = win;
