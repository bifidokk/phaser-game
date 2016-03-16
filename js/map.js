/**
 * Created by danilka on 15.03.2016.
 */
var MAP_COLLISION_TILES_NAME = 'collision';

var Map = function(game) {
    this.game = game;
    this.tilemap = 'level';
    this.tileimage = 'tiles';
    this.layers = {};
    this.map = null;
};


Map.prototype.addMap = function() {
    this.map = this.game.add.tilemap(this.tilemap);
    this.map.addTilesetImage('blocks', this.tileimage);

    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            var collision_tiles = [];
            layer.data.forEach(function (data_row) {
                data_row.forEach(function (tile) {
                    if (tile != null && tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }

        this.layers[layer.name].resizeWorld();
    }, this);
};


