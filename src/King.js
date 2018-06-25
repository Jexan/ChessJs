(function(){

    class King extends Game.Piece{
        encastling() {
            // y of the king is always x of the possible encastling rook
            let rowRef = Game.board[this.y],
                eitherPieceHasMoved = this.hasMoved || rowRef[this.y].hasMoved;

            if(!eitherPieceHasMoved && betweenIsEmpty(rowRef, this)) {
                return {
                    x: this.x + this.direction * -2,
                    y: this.y,
                    specialMove: encastle
                };
            } else {
                return false;
            }
        }

        getPossibleMoves() {
            let encastling = this.encastling(),
                possible = [];
            
            _.each(_.range(this.x-1, this.x+2), (x) => {
                _.each(_.range(this.y-1, this.y+2), (y) => {
                    possible.push({x : x, y: y});
                });
            });

            if(encastling)
                possible.push(encastling);

            return possible;
        }
    }
    
    function betweenIsEmpty (row, king){
        return !(
            row[king.x+king.direction*-1] 
                ||
            row[king.x+king.direction*-2]
        );
    }

    function encastle (king){
        const tower = Game.board[king.y][king.x+king.direction*-1];
        // When this is called, the king has already moved.
        king.moveToEncastling = false;
        tower.move(king.x+king.direction, king.y);        
        
        Game.state.changeTurn();
    }

    Game.King = King;
}())