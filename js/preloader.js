/**
 * Created by danilka on 15.03.2016.
 */
var Preloader = function(game) {
    this.game = game;
};

Preloader.prototype.preload = function() {
    var loadingBar = this.game.add.sprite(300, 300, "loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(loadingBar);

    var d = new Date();

    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/skull.png', 80, 80, -1, 0, 0);
    this.game.load.tilemap('level', 'assets/level1.json?v=' + d, null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/generic_platformer_tiles.png');
};

Preloader.prototype.create = function() {
    this.game.state.start('Game');
};