Game.chess = new Phaser.Game(
	Game.windowWidth, Game.windowHeigth, Phaser.AUTO, 'gameDiv'
);

Game.chess.state.add('main', Game.state);
Game.chess.state.start('main');