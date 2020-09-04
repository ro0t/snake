import GameLoop from './components/gameLoop';
import GameScreen from './components/gameScreen';
import './styles/game.scss';

const container = document.getElementById('gameScreen');
const context = container.getContext('2d');

const gs = new GameScreen(container, context);
const gl = new GameLoop(gs.update, gs.draw);

// Start the game
gl.start();