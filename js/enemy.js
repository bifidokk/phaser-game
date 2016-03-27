/**
 * Created by danilka on 23.03.2016.
 */
var Enemy = function (game, x, y, name) {
    this.game = game;
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

    this.walkingSpeed = 80;
    this.runningSpeed = 160;
    this.direction = 'right';
    this.directionKoef = 1;
    this.body.velocity.x = this.walkingSpeed;

    this.detectionDistance = 50;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyUpdate = function() {
    var standing = this.body.blocked.down || this.body.touching.down;

    if(standing) {
        this.animations.play('run');

        if(!this.canWalk()) {
            this.directionKoef *= -1;
            this.scale.x *= -1;
        }

        if(this.detectPlayer()) {
            this.directionKoef = (this.game.player.x < this.body.x) ? -1 : 1;
            this.body.velocity.x = this.directionKoef * this.runningSpeed;
        } else {
            this.body.velocity.x = this.walkingSpeed * this.directionKoef;
        }
    }

    this.game.debug.body(this);
};

Enemy.prototype.canWalk = function() {
    var delta = 0;
    if(this.directionKoef == -1) {
        delta = MAP_TILE_WIDTH;
    }
    var positionToCheck = new Phaser.Point(this.body.x + (this.directionKoef * MAP_TILE_WIDTH) + delta, this.body.bottom + 1);
    return this.game.map.getTileWorldXY(positionToCheck.x, positionToCheck.y, MAP_TILE_WIDTH, MAP_TILE_HEIGHT, MAP_COLLISION_TILES_NAME);
};

Enemy.prototype.detectPlayer = function() {
    var distanceToPlayer = Math.abs(this.body.x - this.game.player.x);
    return (this.body.bottom === this.game.player.body.bottom) && (distanceToPlayer <= this.detectionDistance);
};

