(function(){

    class Rook extends Game.Piece {

        getPossibleMoves() {
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
    }

    Game.Rook = Rook;

}());