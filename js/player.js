/**
 * Created by danilka on 26.02.2016.
 */
Player = function (game, x, y, name) {

    Phaser.Sprite.call(this, game, x, y, name);

    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.body.width = 30;
    this.body.height = 70;
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.body.touching.down = true;

    this.anchor.setTo(.5, .5);

    this.animations.add('run', [12, 13, 14, 15, 16, 17, 18, 19], 8, true);
    this.animations.add('jump', [9], 1, true);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.direction = 'right';
    this.jumpTimer = 0;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.playerUpdate = function() {

    var standing = this.body.blocked.down || this.body.touching.down;
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
        this.body.velocity.x = -150;

        if(standing) {
            this.animations.play('run');
        } else {
            this.animations.play('jump');
        }

        if(this.direction != 'left') {
            this.scale.x *= -1;
            this.direction = 'left';
        }
    } else if (this.cursors.right.isDown) {
        this.body.velocity.x = 150;

        if(standing) {
            this.animations.play('run');
        } else {
            this.animations.play('jump');
        }

        if(this.direction != 'right') {
            this.scale.x *= -1;
            this.direction = 'right';
        }
    } else {
        this.animations.stop();
        this.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && standing && game.time.time > this.jumpTimer){
        this.body.velocity.y = -350;
        this.jumpTimer = game.time.time + 750;
    }
};




