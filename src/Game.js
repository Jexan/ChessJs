// Game Constants
const Game = {
	windowWidth: 400,
	windowExtraY: 40,

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
		font: '18pt Segoe UI',
		fill: 'black'
	},

	turnColorTextStyle: {
		font: '18pt Segoe UI',
		fill: '#333'
	},

	doubleSteppedPawn: null
}
	
Game.windowHeigth = Game.windowWidth + Game.windowExtraY;
Game.squareLength = Game.windowWidth/8;

Game.turnTextX = Game.squareLength*2.5;
Game.turnTextY = Game.windowWidth;

Game.turnColorTextY = Game.windowWidth + Game.squareLength*.05;
Game.turnColorTextX = Game.turnTextX + Game.squareLength*1.5;