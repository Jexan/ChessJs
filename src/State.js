var State= function(){};

State.prototype.preload = function(){
	this.stage.backgroundColor= "#eeeeee";

	this.load.image('blackSquare', 'imgs/square.png');
	this.load.image('possibleSquare', 'imgs/possibleMove.png');

	// Pieces images loading
	this.load.image('blackPawn', 'imgs/blackPawn.png');
	this.load.image('whitePawn', 'imgs/whitePawn.png');
	this.load.image('blackKing', 'imgs/blackKing.png');
	this.load.image('whiteKing', 'imgs/whiteKing.png');
	this.load.image('blackQueen', 'imgs/blackQueen.png');
	this.load.image('whiteQueen', 'imgs/whiteQueen.png');
	this.load.image('blackRook', 'imgs/blackRook.png');
	this.load.image('whiteRook', 'imgs/whiteRook.png');
	this.load.image('blackKnight', 'imgs/blackKnight.png');
	this.load.image('whiteKnight', 'imgs/whiteKnight.png');
	this.load.image('blackBishop', 'imgs/blackBishop.png');
	this.load.image('whiteBishop', 'imgs/whiteBishop.png');
};

State.prototype.create = function(){
	this.drawBoard();
	this.possibleSquares = this.add.group();
	this.populateBoard();
	this.turnText = this.add.text(
		Game.turnTextX, 
		Game.turnTextY, 
		'Turn: white', 
		Game.turnTextStyle
	);
};

State.prototype.update = function(){};

// Switches turn and updates the turnText text
State.prototype.changeTurn = function() {
	if(Game.turn === 'white') {
		Game.turn = 'black';
	} else {
		Game.turn = 'white';	
	}

	this.turnText.text = 'Turn: ' + Game.turn;
};

// Draws Board Black Squares
State.prototype.drawBoard = function(){
	var x, y, _x, _y, image;

	for (y = 0 ; y < 8 ; y++){

		// Intervals the drawing of black squares
		x = y % 2 === 0? 0 : 1;

		for( ; x < 8 ; x+=2){
			_x = x*Game.squareLength;
			_y = y*Game.squareLength;

			image = this.game.add.image(_x, _y, 'blackSquare');
			image.scale.x = Game.squareLength / image.width;
        	image.scale.y = Game.squareLength / image.height;
		}
	}
};

// Fills the board array with piece objects 
State.prototype.populateBoard = function(){
	var piece, color;

	_.each(Game.boardRef, function(row, y){
		if(row.length === 0){

			// Blank squares are null
			Game.board.push(_.clone(Game.nullArr));
			return;
		}

		Game.board.push([]);

		_.each(row, function(token, x){

			// It checks the last letter and copy 
			// a reference of the class
			switch(token.charAt(1)){
			case 't':
				piece = Game.Rook;
				break;
			case 'h':
				piece = Game.Knight;
				break;
			case 'b':
				piece = Game.Bishop;
				break;
			case 'k':
				piece = Game.King;
				break;
			case 'q':
				piece = Game.Queen;
				break;
			case 'p':
				piece = Game.Pawn;
				break;
			}

			if(token.charAt(0) === 'w') 
				color = 'white';
			else
				color = 'black';

			Game.board[y].push(new piece(color, x, y));
		});
	});
};

// Gets the coordinates of all pieces of a certain color
State.prototype.getPiecesCoordsByColor = function(color){
	var piecesCoords = [];

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