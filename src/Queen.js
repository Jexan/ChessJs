(function(){
	class Queen extends Game.Piece {

		getPossibleMoves() {
		    // Queen possible moves is a combination of Rook and Bishop's
		    return Game.Rook.prototype.getPossibleMoves
		    	.apply(this)
		        .concat(
		        	Game.Bishop.prototype.getPossibleMoves
		        		.apply(this)
		        );
		};
	}

	Game.Queen = Queen;	
	
}());