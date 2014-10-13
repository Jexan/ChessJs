Game.Bishop = function() {
    this.name = 'Bishop';
    Game.Piece.apply(this, arguments);   
}

Game.Bishop.prototype = Object.create(Game.Piece.prototype);
Game.Bishop.prototype.getPossibleMoves = function () {
    var x, y,
        possibleMoves = [],
        keepAddingMoves = function(x, y) {
            possibleMoves.push({
                    'x': x,
                    'y': y
                });
            return Game.board[y][x] !== null
        };

    // Up-left
    x = this.x - 1;
    y = this.y + 1;
    for ( ; x >= 0, y < 8; x--, y++){
        if (keepAddingMoves(x, y)) break;
    }

    // Up-right
    x = this.x + 1; 
    y = this.y - 1;
    for ( ; x < 8, y >= 0; x++, y--){
        if (keepAddingMoves(x, y)) break;
    }

    // Down-right
    x = this.x + 1;
    y = this.y + 1;
    for ( ; x < 8, y < 8; x++, y++){
        if (keepAddingMoves(x, y)) break;
    }

    // Down-left
    x = this.x - 1;
    y = this.y - 1;
    for ( ; x >= 0, y >= 0; x--, y--){
        if (keepAddingMoves(x, y)) break;
    }

    return possibleMoves;
};