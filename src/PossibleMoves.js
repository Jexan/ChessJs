(function(){
    // Namespace for utility functions that have
    // to deal with possibleSquares
    let possible = {};

    // Gets the coordinates of all pieces of a certain color
    let getPiecesCoordsByColor = function(color){
        let piecesCoords = [];

        _.each(Game.board, function(row){
            _.each(row, function(piece){
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
        possibleMoves = _.filter(possibleMoves, function (move) {

            return !_.some(piecePosition, function (piece) {
                return move.x === piece.x && move.y === piece.y;
            });
        });

        return possibleMoves;
    };

    possible.eliminateOutOfBoard = function (possibleMoves) {
        let predicate = function (value) {
            return value.y < 8;
        };

        return _.filter(possibleMoves, predicate);
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
        return function(x,y){
            possibleMoves.push({
                    'x': x,
                    'y': y
                });
            return Game.board[y][x] !== null
        }
    };

    Game.Possible = possible;

}());