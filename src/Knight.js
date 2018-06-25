(function(){
    class Knight extends Game.Piece{

        getPossibleMoves() {
            // Clockwise hard coded. Any "smart solution" takes more space and
            // is not worth.
            return [
                {
                    x: this.x + 1,
                    y: this.y + 2
                },
                {
                    x: this.x + 2,
                    y: this.y + 1
                },
                {
                    x: this.x + 2,
                    y: this.y - 1
                },
                {
                    x: this.x + 1,
                    y: this.y - 2
                },
                {
                    x: this.x - 1,
                    y: this.y - 2
                },
                {
                    x: this.x - 2,
                    y: this.y - 1
                },
                {
                    x: this.x - 2,
                    y: this.y + 1
                },
                {
                    x: this.x - 1,
                    y: this.y + 2
                }
         	];
        }
    };

    Game.Knight = Knight;
}());