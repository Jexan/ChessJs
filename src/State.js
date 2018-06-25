(function(){

	var State = {};

	State.preload = function(){
		this.stage.backgroundColor= "#eeeeee";
		this.load.spritesheet(Game.assetsKey, Game.assetsFilePath, 64, 64, 14);
	};

	State.create = function(){
		drawBoard();
		populateBoard();
		
		this.possibleSquares = this.add.group();
		this.turnText = this.add.text(
			Game.turnTextX, 
			Game.turnTextY, 
			'TURN:', 
			Game.turnTextStyle
		);

		this.turnColorText = this.add.text(
			Game.turnColorTextX,
			Game.turnColorTextY,
			'White',
			Game.turnTextColorStyle
		);
	};

	// Switches turn and updates the turnText text
	State.changeTurn = function() {
		if(Game.turn === 'White') 
			Game.turn = 'Black';
		else 
			Game.turn = 'White';	

		this.turnColorText.text = Game.turn;
	};

	// Draws Board Black Squares
	var drawBoard = function(){
		var x, y, pieceImgX, pieceImgY, image;

		for (y = 0 ; y < 8 ; y++){

			// Intervals the drawing of black squares
			x = y % 2 === 0? 0 : 1;

			for( ; x < 8 ; x+=2){
				pieceImgX = x*Game.squareLength;
				pieceImgY = y*Game.squareLength;

				image = State.game.add.image(pieceImgX, pieceImgY, Game.assetsKey, Game.assetsAtlas.blackSquare);
				image.scale.x = Game.squareLength / image.width;
	        	image.scale.y = Game.squareLength / image.height;
			}
		}
	};

	// Fills the board array with piece objects 
	var populateBoard = function(){
		
		Game.boardRef.forEach((row, y) => {
			if(row.length === 0){

				// Blank squares are null
				Game.board.push(_.clone(Game.nullArr));
				return;
			}

			Game.board.push([]);

			row.forEach((token, x) => {
				let piece, color;

				if (!token) {
					Game.board[y].push(null);
					return;
				}

				// It checks the last letter and copies 
				// a reference of the class
				switch(token.charAt(1)){
				case 'r':
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

	Game.state = State;

}());