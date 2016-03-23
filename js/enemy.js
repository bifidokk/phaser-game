/**
 * Created by danilka on 23.03.2016.
 */
var Enemy = function (game, x, y, name, map) {

    this.game = game;
    this.map = map;
    Phaser.Sprite.call(this, this.game, x, y, name);

    this.game.physics.arcade.enable(this);

    this.body.width = 30;
    this.body.height = 70;
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.body.touching.down = true;

    this.anchor.setTo(.5, .5);

    this.animations.add('run', [12, 13, 14, 15, 16, 17, 18, 19], 8, true);
    this.animations.add('jump', [9], 1, true);

    this.walking_speed = 80;
    this.direction = 'right';
    this.directionKoef = 1;
    this.body.velocity.x = this.walking_speed;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Player;

Enemy.prototype.enemyUpdate = function() {
    this.animations.play('run');

    if(!this.canWalk()) {
        this.directionKoef *= -1;
        this.body.velocity.x = this.walking_speed * this.directionKoef;
    }
};

Enemy.prototype.canWalk = function() {
    var positionToCheck = new Phaser.Point(this.body.x + (this.directionKoef * 32), this.body.bottom + 1);
    return this.map.map.getTileWorldXY(positionToCheck.x, positionToCheck.y, 32, 32, "collision");
};