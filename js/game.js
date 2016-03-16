/**
 * Created by danilka on 16.03.2016.
 */
var Game = function(game){
    this.game = game;
};

Game.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.sky = this.game.add.sprite(0, 0, 'sky');
    this.sky.fixedToCamera = true;

    this.map = new Map(this.game);
    this.map.addMap();

    this.player = new Player(this.game, 40, 3100, 'dude');

    this.score = new Score(this.game);

    this.starsManager = new Stars(this.game, this.score);
    this.starsManager.onKilled.add(this.score.addScore, this.score);


    this.game.camera.y = 2600;
    this.game.camera.follow(this.player);
};

Game.prototype.update = function() {
    this.game.physics.arcade.collide(this.player, this.map.layers[ MAP_COLLISION_TILES_NAME ]);
    this.game.physics.arcade.collide(this.starsManager.stars, this.map.layers[ MAP_COLLISION_TILES_NAME ]);
    this.game.physics.arcade.overlap(this.player, this.starsManager.stars, this.starsManager.collectStar, null, this.starsManager);

    this.player.playerUpdate();
};
