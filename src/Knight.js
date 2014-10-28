(function(){
    var Knight = function() {
        this.name = 'Knight';
        Game.Piece.apply(this, arguments);    
    }

    Knight.prototype = Object.create(Game.Piece.prototype);

    Knight.prototype.getPossibleMoves = function () {
        // Clockwise hard coded
        return Game.Possible.eliminateOutOfBoard([
            {
                'x': this.x + 1,
                'y': this.y + 2
            },
            {
                'x': this.x + 2,
                'y': this.y + 1
            },
            {
                'x': this.x + 2,
                'y': this.y - 1
            },
            {
                'x': this.x + 1,
                'y': this.y - 2
            },
            {
                'x': this.x - 1,
                'y': this.y - 2
            },
            {
                'x': this.x - 2,
                'y': this.y - 1
            },
            {
                'x': this.x - 2,
                'y': this.y + 1
            },
            {
                'x': this.x - 1,
                'y': this.y + 2
            }
     	])
    };

    Game.Knight = Knight;

}());