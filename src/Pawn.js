Game.Pawn = function() {
    this.name = 'Pawn';

    Game.Piece.apply(this, arguments);
}

Game.Pawn.prototype = Object.create(Game.Piece.prototype);
Game.Pawn.prototype.getPossibleMoves = function () {
    var possibleMoves = [
            {
                'x': this.x,
                'y': this.y + this.direction
            }
        ],
        foward = this.direction + this.y;

    if ( !this.hasMoved &&
            Game.board[foward][this.x] === null &&
            Game.board[foward+this.direction][this.x] === null){

        possibleMoves.push({
            'x': this.x,
            'y': foward + this.direction
        });
    }

    // If a piece is in front of the Pawn 
    // it can't move to that square
    if(foward < 8 || foward >= 0){
        if (Game.board[foward][this.x] !== null) {
            possibleMoves.shift()
        };
    }

    // Checks if a piece is in the pawn "killzone", 
    // allowing the pawn to move there
    if ( this.x > 0 && 
    	    Game.board[foward][this.x - 1] !== null) {

        possibleMoves.push({
            'x': this.x - 1,
            'y': foward
        })
    }

    if ( this.x < 7 && 
            Game.board[foward][this.x + 1] !== null) {
        possibleMoves.push({
            'x': this.x + 1,
            'y': foward
        })
    }

    return possibleMoves;
};