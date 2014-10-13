Game.King = function() {
    this.name = 'King';
    Game.Piece.apply(this, arguments);
}

Game.King.prototype = Object.create(Game.Piece.prototype);
Game.King.prototype.getPossibleMoves = function () {
    // Todo: Add encastling
    return Game.Possible.eliminateOutOfBoard([
        {
            'x': this.x,
            'y': this.y - 1
        },
        {
            'x': this.x + 1,
            'y': this.y - 1
        },
        {
            'x': this.x + 1,
            'y': this.y
        },
        {
            'x': this.x + 1,
            'y': this.y + 1
        },
        {
            'x': this.x,
            'y': this.y + 1
        },
        {
            'x': this.x - 1,
            'y': this.y + 1
        },
        {
            'x': this.x - 1,
            'y': this.y
        },
        {
            'x': this.x - 1,
            'y': this.y - 1
        },
    ])
};