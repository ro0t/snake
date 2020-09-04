import Snake, {Direction} from './snake';
import Fruit from "./fruit";

export default class GameScreen {

    constructor(canvas, context) {
        // Construct shit
        this.ctx = context;
        this.height = canvas.height;
        this.width = canvas.width;
        this.squareSize = 10;

        const sizes = {
            width: this.width,
            height: this.height,
            block: this.squareSize
        };

        this.snake = new Snake(context, sizes);
        this.fruit = new Fruit(context, sizes);

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);

        this.keyboardEvents();
    }

    keyboardEvents() {
        document.addEventListener('keydown', e => {
            const KeyCode = e.code.replace('Arrow', '');

            if(Direction.hasOwnProperty(KeyCode))
                this.updateDirection(Direction[KeyCode]);
        })
    }

    update() {
        this.fruit.update();
        this.snake.update(this.fruit);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.height, this.width);
        this.fruit.draw();
        this.snake.draw();

    }

    updateDirection(direction) {
        this.snake.updateDirection(direction);
    }

}