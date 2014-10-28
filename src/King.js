(function(){

    var King = function() {
        this.name = 'King';
        Game.Piece.apply(this, arguments);

        this.moveToEncastling = false;
    }
    
    King.prototype = Object.create(Game.Piece.prototype);

    King.prototype.encastling = function(){
        // y of the king is always x of the possible encastling rook
        var rowRef = Game.board[this.y],
            bothPiecesHaveMoved = this.hasMoved || rowRef[this.y].hasMoved;

        if(!bothPiecesHaveMoved && betweenIsEmpty(rowRef, this)) {
            this.moveToEncastling = true;
            return {
                'x': this.x+this.direction * -2,
                'y': this.y
            };
        } else {
            return false;
        }
    }

    King.prototype.getPossibleMoves = function () {
        var encastling = this.encastling(),
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
    };

    var betweenIsEmpty = function(row, king){
        return !(
            row[king.x+king.direction*-1] 
                && 
            row[king.x+king.direction*-2]
        );
    }

    Game.King = King;
}())