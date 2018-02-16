(function(){

    class Bishop extends Game.Piece{
        getPossibleMoves() {
            let x, y,
                possibleMoves = [],
                keepAddingMoves = Game.Possible.keepAdding(possibleMoves);

            // Up-left
            x = this.x - 1;
            y = this.y + 1;
            for ( ; x >= 0, y < 8; x--, y++){
                if (keepAddingMoves(x, y)) break;
            }

            // Up-right
            x = this.x + 1; 
            y = this.y - 1;
            for ( ; x < 8, y >= 0; x++, y--){
                if (keepAddingMoves(x, y)) break;
            }

            // Down-right
            x = this.x + 1;
            y = this.y + 1;
            for ( ; x < 8, y < 8; x++, y++){
                if (keepAddingMoves(x, y)) break;
            }

            // Down-left
            x = this.x - 1;
            y = this.y - 1;
            for ( ; x >= 0, y >= 0; x--, y--){
                if (keepAddingMoves(x, y)) break;
            }

            return possibleMoves;
        };
    }


    Game.Bishop = Bishop;
}());