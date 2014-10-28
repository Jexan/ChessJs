(function(){

    var Rook = function() {
        this.name = 'Rook';
        Game.Piece.apply(this, arguments);
    }

    Rook.prototype = Object.create(Game.Piece.prototype);

    Rook.prototype.getPossibleMoves = function () {
        var x, y,
            possibleMoves = [],
            keepAddingMoves = Game.Possible.keepAdding(possibleMoves);

        // Up
        for (y = this.y - 1; y >= 0; y--) {
            if(keepAddingMoves(this.x, y)) 
                break;
        }

        // Down
        for (y = this.y + 1; y < 8; y++) {
            if(keepAddingMoves(this.x, y)) 
                break;
        }

        // Left
        for (x = this.x - 1; x >= 0; x--) {
            if(keepAddingMoves(x, this.y)) 
                break;
        }

        // Right
        for (x = this.x + 1; x < 8; x++) {
            if(keepAddingMoves(x, this.y)) 
                break;
        }

        return possibleMoves;
    };

    Game.Rook = Rook;

}());