Game.King = function() {
    this.name = 'King';
    this.moveToEncastling = false;
    Game.Piece.apply(this, arguments);
}

Game.King.prototype = Object.create(Game.Piece.prototype);
Game.King.prototype.encastling = function(){
    var bothPiecesHaveMoved = this.hasMoved || Game.board[this.y][this.y].hasMoved;
    
    if(bothPiecesHaveMoved){
        return false;
    }

    if(!(Game.board[this.y][this.x+this.direction*-1] && Game.board[this.y][this.x+this.direction*-2])){
        this.moveToEncastling = true;
        return {
            'x': this.x+this.direction * -2,
            'y': this.y
        };
    }

    return false;
}

Game.King.prototype.getPossibleMoves = function () {
    // Todo: Add encastling
    var possible = [
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
    ];

    var encastling = this.encastling();

    if(this.encastling()){
        possible.push(encastling);
    }

    return Game.Possible.eliminateOutOfBoard(possible);
};