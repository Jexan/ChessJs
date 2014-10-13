Game.Queen = function() {
    this.name = 'Queen';
    Game.Piece.apply(this, arguments);   
}

Game.Queen.prototype = Object.create(Game.Piece.prototype);
Game.Queen.prototype.getPossibleMoves = function () {
    // Queen possible moves is a combination of Rook and Bishop's
    return Game.Rook.prototype.getPossibleMoves
    	.apply(this)
        .concat(
        	Game.Bishop.prototype.getPossibleMoves
        		.apply(this)
        );
};