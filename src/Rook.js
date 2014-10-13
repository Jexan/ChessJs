Game.Rook = function() {
    this.name = 'Rook';
    Game.Piece.apply(this, arguments);
}

Game.Rook.prototype = Object.create(Game.Piece.prototype);
Game.Rook.prototype.getPossibleMoves = function () {
    var x, y,
        possibleMoves = [],
        keepAddingMoves = function(x, y) {
            possibleMoves.push({
                    'x': x,
                    'y': y
                });
            return Game.board[y][x] !== null
        };

    // Up
    for (y = this.y - 1; y >= 0; y--) {
        if(keepAddingMoves(this.x, y)) 
            break;
    }

    // Down
    for (y = this.y + 1; y < 8; y++) {
        if(keepAddingMoves(this.x, y)) 
            break;
    }

    // Left
    for (x = this.x - 1; x >= 0; x--) {
        if(keepAddingMoves(x, this.y)) 
            break;
    }

    // Right
    for (x = this.x + 1; x < 8; x++) {
        if(keepAddingMoves(x, this.y)) 
            break;
    }

    return possibleMoves;
};