/**
 * Created by danilka on 27.02.2016.
 */
Stars = function(game) {
    this.game = game;
    this.stars = game.add.group();
    this.stars.enableBody = true;

    this.createStars();
    this.onKilled = new Phaser.Signal();
};

Stars.prototype = Object.create(Phaser.Sprite.prototype);
Stars.prototype.constructor = Stars;

Stars.prototype.createStars = function() {
    for (var i = 0; i < 12; i++) {
        var star = this.stars.create(i * 70, 2600, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.2;
    }
};

Stars.prototype.collectStar = function(player, star) {
    star.body.gravity.y = 0;
    star.body.bounce.y = 0;

    if(star.collected) {
        return false;
    }

    star.collected = true;

    game.add.tween(star).to( { x: score.scoreText.x, y: score.scoreText.y }, 500, "").start().onComplete.add(this.killStar, star);
    this.onKilled.dispatch();
};

Stars.prototype.killStar = function(star) {
    this.game.tweens.removeAll(star);
    star.kill();

    console.log(this.game.tweens);
};