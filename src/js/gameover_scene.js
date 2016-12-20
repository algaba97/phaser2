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