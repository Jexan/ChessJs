(function(){
    // Namespace for utility functions that have
    // to deal with possibleSquares
    let possible = {};

    // Gets the coordinates of all pieces of a certain color
    let getPiecesCoordsByColor = function(color){
        let piecesCoords = [];

        Game.board.forEach((row) => {
            row.forEach((piece) => {
                if( piece !== null &&
                        piece.color == color){

                    piecesCoords.push({
                        'x': piece.x,
                        'y': piece.y,
                    });
                }
            });
        });

        return piecesCoords;
    };

    possible.removeAlliedPieces = function (piece, possibleMoves) {
        let piecePosition = getPiecesCoordsByColor(piece.color);

        // Cleans off squares occupated by allied pieces
        possibleMoves = possibleMoves.filter((move) => {
            return !piecePosition.some((piece) => {
                return move.x === piece.x && move.y === piece.y;
            });
        });

        return possibleMoves;
    };

    possible.eliminateOutOfBoard = function (possibleMoves) {
        // We really only get out of board moves for y > 8, 
        // but extra protection is never too much 
        return possibleMoves.filter((move) => {
            return (move.y < 8 && move.y >= 0) && (move.x < 8 && move.x >= 0);    
        });
    };

    possible.drawPossible = function (piece, move) {
        let image = Game.chess.add.image(
            move.x * Game.squareLength, 
            move.y * Game.squareLength, 
            Game.assetsKey,
            Game.assetsAtlas.possibleSquare
        );

        image.inputEnabled = true;
        image.events.onInputDown.add(() => {
            piece.move(image.x / Game.squareLength, image.y / Game.squareLength, move.specialMove);
        });

        image.input.priorityID = 1;

        image.scale.x = Game.squareLength / image.width;
        image.scale.y = Game.squareLength / image.height;

        Game.state.possibleSquares.add(image);
    };

    // Helper function for Bishop, Rook and Queen
    possible.keepAdding = function(possibleMoves) {
        return function(x,y) {
            possibleMoves.push({
                'x': x,
                'y': y
            });
            return Game.board[y][x] !== null;
        }
    };

    Game.Possible = possible;

}());