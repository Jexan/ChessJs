(function(){

    class King extends Game.Piece{
        encastling() {
            // y of the king is always x of the possible encastling rook
            let rowRef = Game.board[this.y],
                eitherPieceHasMoved = this.hasMoved || rowRef[this.y].hasMoved;

            if(!eitherPieceHasMoved && betweenIsEmpty(rowRef, this)) {
                return {
                    'x': this.x + this.direction * -2,
                    'y': this.y,
                    'specialMove': encastle
                };
            } else {
                return false;
            }
        }

        getPossibleMoves() {
            let encastling = this.encastling(),
                possible = [];
            
            // Functional way to make the king moves
            _.each(_.range(this.x-1, this.x+2), function(x){

                _.each(_.range(this.y-1, this.y+2), function(y){
                    possible.push({'x' : x, 'y': y});
                });

            }, this);

            if(encastling){
                possible.push(encastling);
            }

            return Game.Possible.eliminateOutOfBoard(possible);
        }
    }
    
    let betweenIsEmpty = function(row, king){
        return !(
            row[king.x+king.direction*-1] 
                ||
            row[king.x+king.direction*-2]
        );
    }

    let encastle = function(king){
        // When this is called, the king has already moved.
        king.moveToEncastling = false;
        
        let tower = Game.board[king.y][king.x+king.direction*-1].move(king.x+king.direction, king.y);
        
        Game.state.changeTurn();
    }

    Game.King = King;
}())