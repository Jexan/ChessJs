(function(){

    class Piece {
        constructor(color, x, y){
            this.color = color;
            this.x = x;
            this.y = y;
            
            // For Pawn Double Step and Encastling
            this.hasMoved = false;
            this.justDoubleStepped = false;
            // Determines to where should it move
            this.direction = this.color === 'black' ? 1 : -1;

            setupImage.call(this, null);
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


    let setupImage = function () {
        let pieceName = this.color + this.constructor.name,
            x = this.x * Game.squareLength,
            y = this.y * Game.squareLength;

        this.image = Game.chess.add.image(x, y, Game.assetsKey, Game.assetsAtlas[pieceName]);

        // Scales the piece proportional to the squareLength
        this.image.scale.x = Game.squareLength / this.image.width;
        this.image.scale.y = Game.squareLength / this.image.height;

        // Fires up the move routine when clicked
        this.image.inputEnabled = true;
        this.image.events.onInputDown.add(handlePossibleMoves, this);
        this.image.input.priorityID = 0;
    };

    let handlePossibleMoves = function () {
        if(Game.turn.toLowerCase() !== this.color)
            return;

        let possibleMoves = this.getPossibleMoves();

        Game.state.possibleSquares.removeAll();

        // Removes unvalid movements
        possibleMoves = Game.Possible.removeAlliedPieces(this, possibleMoves);

        _.each(possibleMoves, (move) => {
            Game.Possible.drawPossible(this, move);
        });
    };

    Game.Piece = Piece;
}());