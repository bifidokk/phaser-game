/**
 * Created by danilka on 27.02.2016.
 */
var Score = function(game) {
    this.score = 0;
    this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText.fixedToCamera = true;
};

Score.prototype.addScore = function() {
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
};