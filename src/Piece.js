(function(){

    class Piece {
        constructor(color, x, y){
            this.color = color;
            this.x = x;
            this.y = y;
            
            // For Pawn Double Step and Encastling
            this.hasMoved = false;
            this.justDoubleStepped = false;

            // Useful for pawns and transforming queens.
            this.direction = this.color === 'black' ? 1 : -1;

            setupImage(this);
        }

        move(x, y, specialMove) {
            Game.board[this.y][this.x] = null;

            if(Game.doubleSteppedPawn) {
                Game.doubleSteppedPawn.justDoubleStepped = false;
                Game.doubleSteppedPawn = null;
            }

            this.image.x = x * Game.squareLength;
            this.image.y = y * Game.squareLength;

            this.x = x;
            this.y = y;
            this.hasMoved = true;

            // Handles eliminating pieces
            if(Game.board[this.y][this.x] !== null){
                Game.board[this.y][this.x].image.kill();
            }

            // Updates the game boards. Eliminating duplicates
            Game.board[this.y][this.x] = this;

            // Changes the Pawn to Queen if it reaches the last slot
            // TODO: Allows the player to select any non-king piece
            if(this.constructor.name === 'Pawn'){
                if(this.y === 0 || this.y === 7){
                    this.image.kill();
                    Game.board[this.y][this.x] = new Game.Queen(this.color, this.x, this.y);
                }
            }

            if (specialMove) {
                specialMove(this);
            }

            // Erases higligted squares
            Game.state.possibleSquares.removeAll();

            // Pass the turn
            Game.state.changeTurn();
        };   
    };

    function setupImage (piece) {
        let pieceName = piece.color + piece.constructor.name,
            x = piece.x * Game.squareLength,
            y = piece.y * Game.squareLength;

        piece.image = Game.chess.add.image(x, y, Game.assetsKey, Game.assetsAtlas[pieceName]);

        // Scales the piece proportional to the squareLength
        piece.image.scale.x = Game.squareLength / piece.image.width;
        piece.image.scale.y = Game.squareLength / piece.image.height;

        // Fires up the move routine when clicked
        piece.image.inputEnabled = true;
        piece.image.events.onInputDown.add(handlePossibleMoves, piece);
        piece.image.input.priorityID = 0;
    };

    function handlePossibleMoves () {
        if(Game.turn.toLowerCase() !== this.color)
            return;

        let possibleMoves = Game.Possible.eliminateOutOfBoard(this.getPossibleMoves());

        Game.state.possibleSquares.removeAll();

        // Removes unvalid movements
        possibleMoves = Game.Possible.removeAlliedPieces(this, possibleMoves);

        _.each(possibleMoves, (move) => {
            Game.Possible.drawPossible(this, move);
        });
    };

    Game.Piece = Piece;
}());