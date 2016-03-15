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

    if(star.collected) {
        return false;
    }

    star.collected = true;
    star.body.moves = false;

    game.add.tween(star)
        .to( { x: score.scoreText.x, y: score.scoreText.y }, 1000, null)
        .start()
        .onComplete
        .add(function(){
            star.kill();
            this.onKilled.dispatch();
        }, this);
};