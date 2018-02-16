// Game Constants
const Game = {
	windowWidth: 400,
	windowHeigth: 480,

	board: [],

	// The tokens represent the pieces position.
	boardRef: [
			['bt', 'bh', 'bb', 'bk', 'bq', 'bb', 'bh', 'bt'],
			['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
			[],[],[],[],
			['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
			['wt', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wt']
	],
	
	// For Encastling testing purposes
	/*
	boardRef: [
			['bt', '', '', 'bk', 'bq', 'bb', 'bh', 'bt'],
			['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
			[],[],[],[],
			['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
			['wt', 'wh', 'wb', 'wq', 'wk', '', '', 'wt']
	], 
	*/
	
	// For en passant testing purposes
	/* boardRef: [[],[],[],[],
	 	['', '', '', '', 'bp', '', '', ''],[], [],
		['', '', '', '', '', 'wp', '', '']
	], */
	
	// Used to quickly populate the empty rows
	nullArr: [
			null,null,null,null,null,null,null,null
	],

	turn: 'white',

	turnTextStyle: {
			font: '12pt arial',
			fill: 'black'
	},

	doubleSteppedPawn: null
}
	
Game.turnTextX = Math.floor(Game.windowWidth * 0.1);
Game.turnTextY = Math.floor(Game.windowWidth * 1.01);
Game.squareLength = Game.windowWidth/8;