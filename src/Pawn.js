(function(){
    
    class Pawn extends Game.Piece{

        getPossibleMoves() {
            let possibleMoves = [],
                foward = this.direction + this.y;

            if (!(foward === 8 || foward === -1)) {
                if (Game.board[foward][this.x] === null) {
                    possibleMoves.push({
                            'x': this.x,
                            'y': this.y + this.direction
                    });
                }

                // Allows the pawn to move two squares
                if (!this.hasMoved && 
                    Game.board[foward+this.direction][this.x] === null) {
                    
                    // doubleStep is for en-passant
                    possibleMoves.push({
                        'x': this.x,
                        'y': foward + this.direction,
                        'specialMove': doubleStep
                    });
                }
            }

            let leftDiag = {
                'x': this.x - 1,
                'y': foward
            },
            rightDiag = {
                'x': this.x + 1,
                'y': foward
            };

            // Checks if a piece is in the pawn "killzone", 
            // allowing the pawn to move there
            if (Game.board[foward][this.x - 1]) {
                possibleMoves.push(leftDiag);
            }

            if (Game.board[foward][this.x + 1]) {
                possibleMoves.push(rightDiag);
            }


            let leftPiece = Game.board[this.y][this.x-1],
                rightPiece = Game.board[this.y][this.x+1];
            // Checks if the side pawns are en passant
            if (leftPiece){
                if(leftPiece.justDoubleStepped) {
                    leftDiag.specialMove = enPassant;
                    possibleMoves.push(leftDiag);
                }
            }

            if (rightPiece){
                if(rightPiece.justDoubleStepped) {
                    rightDiag.specialMove = enPassant;
                    possibleMoves.push(rightDiag);
                }
            }


            return possibleMoves;
        };
    }

    let doubleStep = function(pawn) {
        pawn.justDoubleStepped = true;

        Game.doubleSteppedPawn = pawn;
    }

    let enPassant = function(pawn) {
        // Makes sure that the piece "en passé" dies
        Game.board[pawn.y - pawn.direction][pawn.x].image.kill();
        Game.board[pawn.y - pawn.direction][pawn.x] = null;
    }

    Game.Pawn = Pawn;
}());