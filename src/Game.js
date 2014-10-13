var Game = {};

Game.windowWidth = 400;
Game.windowHeigth = 480;
Game.squareLength = Game.windowWidth/8;

Game.board = [];

// The tokens represent the pieces position.
Game.boardRef = [
	['bt', 'bh', 'bb', 'bk', 'bq', 'bb', 'bh', 'bt'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	[],[],[],[],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wt', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wt']
];

// Used to quickly populate the empty rows
Game.nullArr = [
	null,null,null,null,null,null,null,null
];

Game.turn = 'white';

Game.turnTextX = Math.floor(Game.windowWidth * 0.1);
Game.turnTextY = Math.floor(Game.windowWidth * 1.01);
Game.turnTextStyle = {
	font: '12pt arial',
	fill: 'black'
};

// Namespace for utility functions that have
// to deal with possibleSquares
Game.Possible = {};

Game.Possible.movePieceToPossible = function(image){
    this.move(image.x, image.y, this);
};

Game.Possible.removeAlliedPieces = function (piece, possibleMoves) {
    var piecePosition = Game.state
        .getPiecesCoordsByColor(piece.color);

    // Cleans off squares occupated by allied pieces
    possibleMoves = _.filter(possibleMoves, function (move) {

        return !_.some(piecePosition, function (piece) {
            return move.x === piece.x && move.y === piece.y;
        });
    });

    return possibleMoves;
};

Game.Possible.eliminateOutOfBoard = function (possibleMoves) {
    var predicate = function (value) {
        return value.y < 8;
    };

    return _.filter(possibleMoves, predicate);
};

Game.Possible.drawPossible = function (piece, move) {
    var image;
    image = Game.chess.add.image(
        move.x * Game.squareLength, 
        move.y * Game.squareLength, 
        'possibleSquare'
    );

    image.inputEnabled = true;
    image.events.onInputDown
        .add(Game.Possible.movePieceToPossible, piece);
    image.input.priorityID = 1;

    image.scale.x = Game.squareLength / image.width;
    image.scale.y = Game.squareLength / image.height;

    Game.state.possibleSquares.add(image);
};