/**
 * Created by danilka on 27.02.2016.
 */
var Stars = function(game, score) {
    this.game = game;
    this.score = score;
    this.stars = game.add.group();
    this.stars.enableBody = true;

    this.createStars();
    this.onKilled = new Phaser.Signal();
};

Stars.prototype.createStars = function() {
    this.game.mapData.stars.forEach(function(data){
        var star = this.stars.create(data.worldX, data.worldY, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.2;
    }, this);
};

Stars.prototype.collectStar = function(player, star) {

    if(star.collected) {
        return false;
    }

    star.collected = true;
    star.body.moves = false;

    this.game.add.tween(star)
        .to( { x: this.score.scoreText.x, y: this.score.scoreText.y }, 1000, null)
        .start()
        .onComplete
        .add(function(){
            star.kill();
            this.onKilled.dispatch();
        }, this);
};