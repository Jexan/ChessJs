(function(){
	// Global Namespace
	Game = {};

	// Game Constants
	Game.windowWidth = 400;
	Game.windowHeigth = 480;
	Game.squareLength = Game.windowWidth/8;

	Game.board = [];

	// The tokens represent the pieces position.
	Game.boardRef = [
		['bt', 'bh', 'bb', 'bk', 'bq', 'bb', 'bh', 'bt'],
		['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
		[],[],[],[],
		['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
		['wt', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wt']
	];

	// Used to quickly populate the empty rows
	Game.nullArr = [
		null,null,null,null,null,null,null,null
	];

	Game.turn = 'white';

	Game.turnTextX = Math.floor(Game.windowWidth * 0.1);
	Game.turnTextY = Math.floor(Game.windowWidth * 1.01);
	Game.turnTextStyle = {
		font: '12pt arial',
		fill: 'black'
	};

}());