// Game Constants
const Game = {
	windowWidth: 400,
	windowHeigth: 480,

	board: [],

	// The tokens represent the pieces position.
	boardRef: [
			['br', 'bh', 'bb', 'bk', 'bq', 'bb', 'bh', 'br'],
			['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
			[],[],[],[],
			['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
			['wr', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wr']
	],

	// For testing Encastling
	/*
	boardRef: [
			['bt', '', '', 'bk', 'bq', 'bb', 'bh', 'bt'],
			['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
			[],[],[],[],
			['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
			['wt', 'wh', 'wb', 'wq', 'wk', '', '', 'wt']
	], 
	*/
	
	// For testing en passant
	/* boardRef: [[],[],[],[],
	 	['', '', '', '', 'bp', '', '', ''],[], [],
		['', '', '', '', '', 'wp', '', '']
	], */

	assetsAtlas: {
		whiteKing: 0,
		whiteQueen: 1,
		whiteRook: 2,
		whiteBishop: 3,
		whiteKnight: 4,
		whitePawn: 5,
		blackSquare: 6,
		blackKing: 7,
		blackQueen: 8,
		blackRook: 9,
		blackBishop: 10,
		blackKnight: 11,
		blackPawn: 12,
		possibleSquare: 13
	},

	assetsKey: 'assets',
	assetsFilePath: 'imgs/assets.png',
	
	// Used to quickly populate the empty rows
	nullArr: [
			null,null,null,null,null,null,null,null
	],

	turn: 'White',

	turnTextStyle: {
			font: '12pt Segoe UI',
			fill: 'black'
	},

	doubleSteppedPawn: null
}
	
Game.turnTextX = Math.floor(Game.windowWidth * 0.5);
Game.turnTextY = Math.floor(Game.windowWidth * 1.01);
Game.squareLength = Game.windowWidth/8;