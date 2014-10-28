(function(){

    var Piece = function (color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.hasMoved = false;

        // Determines to where should it move
        this.direction = this.color === 'black' ? 1 : -1;

        setupImage.call(this, null);
    };

    Piece.prototype.move = function (x, y) {

        Game.board[this.y][this.x] = null;

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
        if(this.name === 'Pawn'){
            if(this.y === 0 || this.y === 7){
                this.image.kill();
                Game.board[this.y][this.x] = new Game.Queen(this.color, this.x, this.y);
            }
        }

        // Moves the tower when encastling
        if(this.name === 'King' && this.moveToEncastling){
            var tower = Game.board[this.y][this.x+this.direction*-1];
            this.moveToEncastling = false;

            return tower.move(this.x+this.direction, this.y);
        }

        // Erases higligted squares
        Game.state.possibleSquares.removeAll();

        // Pass the turn
        Game.state.changeTurn();
    };

    var setupImage = function () {
        var imageName = this.color + this.name,
            x = this.x * Game.squareLength,
            y = this.y * Game.squareLength;

        this.image = Game.chess.add.image(x, y, imageName);

        // Scales the piece proportional to the squareLength
        this.image.scale.x = Game.squareLength / this.image.width;
        this.image.scale.y = Game.squareLength / this.image.height;

        // Fires up the move routine when clicked
        this.image.inputEnabled = true;
        this.image.events.onInputDown.add(handlePossibleMoves, this);
        this.image.input.priorityID = 0;
    };

    var handlePossibleMoves = function () {
        if(Game.turn !== this.color){
            return;
        }

        var possibleMoves = this.getPossibleMoves();

        // We call this in case the piece to be moved
        Game.state.possibleSquares.removeAll();

        // Removes unvalid movements
        possibleMoves = Game.Possible.removeAlliedPieces(this, possibleMoves);

        _.each(possibleMoves, function(move){
            Game.Possible.drawPossible(this, move);
        }, this);
    };

    Game.Piece = Piece;
    
}());