Game.Knight = function() {
    this.name = 'Knight';
    Game.Piece.apply(this, arguments);    
}

Game.Knight.prototype = Object.create(Game.Piece.prototype);
Game.Knight.prototype.getPossibleMoves = function () {
    // Clockwise hard coding
    return Game.Possible.eliminateOutOfBoard([
        {
            'x': this.x + 1,
            'y': this.y + 2
        },
        {
            'x': this.x + 2,
            'y': this.y + 1
        },
        {
            'x': this.x + 2,
            'y': this.y - 1
        },
        {
            'x': this.x + 1,
            'y': this.y - 2
        },
        {
            'x': this.x - 1,
            'y': this.y - 2
        },
        {
            'x': this.x - 2,
            'y': this.y - 1
        },
        {
            'x': this.x - 2,
            'y': this.y + 1
        },
        {
            'x': this.x - 1,
            'y': this.y + 2
        }
 	])
};