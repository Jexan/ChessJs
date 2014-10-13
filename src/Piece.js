Game.Piece = function (color, x, y) {
    this.move = function (x, y) {
        var oldX = this.x,
            oldY = this.y;

        this.image.x = x;
        this.image.y = y;
        this.x = x / Game.squareLength;
        this.y = y / Game.squareLength;
        this.hasMoved = true;

        // Handles eliminating pieces
        if(Game.board[this.y][this.x] !== null){
            Game.board[this.y][this.x].image.kill();
        }

        // Updates the game boards. Eliminating duplicates
        Game.board[this.y][this.x] = this;
        Game.board[oldY][oldX] = null;

        // Changes the Pawn to Queen if it reaches the last slot
        // TODO: Allows the player to select any non-king piece
        if(this.name === 'Pawn'){
            if(this.y === 0 || this.y === 7){
                this.image.kill();
                Game.board[this.y][this.x] = new Queen(this.color, this.x, this.y);
            }
        }

        // Erases higligted squares
        Game.state.possibleSquares.removeAll();

        // Passes the turn
        Game.state.changeTurn();
    };

    this.setupImage = function () {
        var imageName = this.color + this.name,
            x = this.x * Game.squareLength,
            y = this.y * Game.squareLength;

        this.image = Game.chess.add.image(x, y, imageName);

        // Scales the piece proportional to the squareLength
        this.image.scale.x = Game.squareLength / this.image.width;
        this.image.scale.y = Game.squareLength / this.image.height;

        // Fires up the move routine when clicked
        this.image.inputEnabled = true;
        this.image.events.onInputDown.add(this.handlePossibleMoves, this);
        this.image.input.priorityID = 0;
    };

    this.handlePossibleMoves = function () {
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

    this.color = color;
    this.x = x;
    this.y = y;
    this.hasMoved = false;

    this.setupImage();
};