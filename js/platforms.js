/**
 * Created by danilka on 27.02.2016.
 */

Platforms = function(game){
    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    var ground = this.platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
};

Platforms.prototype = Object.create(Phaser.Sprite.prototype);
Platforms.prototype.constructor = Platforms;