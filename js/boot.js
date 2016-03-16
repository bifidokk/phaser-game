/**
 * Created by danilka on 16.03.2016.
 */
var Boot = function(){
    console.log("%cStarting", "color:white; background:red");
};

Boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/loading.png");
    },
    create: function(){
        this.game.state.start("Preloader");
    }
};