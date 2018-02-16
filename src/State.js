(function(){

	var State = {};

	State.preload = function(){
		this.stage.backgroundColor= "#eeeeee";

		this.load.image('blackSquare', 'imgs/square.png');
		this.load.image('possibleSquare', 'imgs/possibleMove.png');
		
		// Pieces images loading
		_.each(['Pawn', 'King', 'Queen', 'Rook', 'Knight', 'Bishop'], 
			function(piece){
				_.each(['white', 'black'], function(color){
					var pieceName = color + piece;
				 					
					this.load.image(pieceName, 'imgs/' + pieceName + '.png');
				}, this)
		}, this);
	};

	State.create = function(){
		drawBoard();
		populateBoard();
		
		this.possibleSquares = this.add.group();
		this.turnText = this.add.text(
			Game.turnTextX, 
			Game.turnTextY, 
			'Turn: White', 
			Game.turnTextStyle
		);
	};

	State.update = function(){};

	// Switches turn and updates the turnText text
	State.changeTurn = function() {
		if(Game.turn === 'white') {
			Game.turn = 'black';
		} else {
			Game.turn = 'white';	
		}

		this.turnText.text = 'Turn: ' + Game.turn.charAt(0).toUpperCase() + Game.turn.slice(1);
	};

	// Draws Board Black Squares
	var drawBoard = function(){
		var x, y, _x, _y, image;

		for (y = 0 ; y < 8 ; y++){

			// Intervals the drawing of black squares
			x = y % 2 === 0? 0 : 1;

			for( ; x < 8 ; x+=2){
				_x = x*Game.squareLength;
				_y = y*Game.squareLength;

				image = State.game.add.image(_x, _y, 'blackSquare');
				image.scale.x = Game.squareLength / image.width;
	        	image.scale.y = Game.squareLength / image.height;
			}
		}
	};

	// Fills the board array with piece objects 
	var populateBoard = function(){
		
		_.each(Game.boardRef, function(row, y){
			if(row.length === 0){

				// Blank squares are null
				Game.board.push(_.clone(Game.nullArr));
				return;
			}

			Game.board.push([]);

			_.each(row, function(token, x){
				var piece, color;

				if (token === '') {
					Game.board[y].push(null);
					return;
				}

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

	Game.state = State;

}());