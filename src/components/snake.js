import {roundTo, xy} from "../helpers/functions";

export const Direction = {
    Left: 0,
    Right: 1,
    Up: 2,
    Down: 3
};

const SNAKE_INITIAL_LENGTH = 6;

export default class Snake {

    constructor(context, sizes) {
        this.ctx = context;
        this.gameSize = {
            width: sizes.width,
            height: sizes.height
        };

        this.bsize = sizes.block;

        this.snakeDefaultPosition();

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.updateDirection = this.updateDirection.bind(this);
    }

    snakeDefaultPosition() {
        this.tail = [];
        this.direction = Direction.Right;

        for(let i = 0; i < SNAKE_INITIAL_LENGTH; i++) {
            this.tail.push(xy(i * this.bsize, this.bsize));
        }
    }

    checkBoundsOf(position) {
        const { width, height } = this.gameSize;

        if(this.direction === Direction.Right && position.x > width) {
            position.x = 0;
        } else if(this.direction === Direction.Left && position.x < 0) {
            position.x = width;
        } else if(this.direction === Direction.Up && position.y < 0) {
            position.y = height;
        }  else if(this.direction === Direction.Down && position.y > height) {
            position.y = 0;
        }

        return position;
    }

    collideSelf(position) {
        const { x, y } = position;

        for(var i = 0; i < this.tail.length; i++) {
            if(this.tail[i].x === x && this.tail[i].y === y)
                return true;
        }

        return false;
    }

    addToDirection(last) {
        let newPos = null;
        // Add one to the direction
        switch(this.direction) {
            case Direction.Left:
                newPos = xy(last.x - this.bsize, last.y);
                break;
            case Direction.Right:
                newPos = xy(last.x + this.bsize, last.y);
                break;
            case Direction.Up:
                newPos = xy(last.x, last.y - this.bsize);
                break;
            case Direction.Down:
                newPos = xy(last.x, last.y + this.bsize);
                break;
            default:
                return;
        }
        return newPos;
    }

    update(fruit) {

        const last = this.tail[this.tail.length - 1];
        let newPos = null;

        newPos = this.addToDirection(last);

        if(this.collideSelf(newPos)) {
            // Reset the snake size to initial
            //this.tail = this.tail.splice(this.tail.length - SNAKE_INITIAL_LENGTH);
        } else if(fruit.collides(newPos)) {
            // Eat the fruit and grow (don't shift..)
            this.tail.push(this.checkBoundsOf(newPos));
        } else {
            // Remove last element & add the new element
            this.tail.push(this.checkBoundsOf(newPos));
            this.tail.shift();
        }

    }

    updateDirection(newDirection) {
        if(newDirection === Direction.Up && this.direction === Direction.Down) {
            return;
        }
        if(newDirection === Direction.Down && this.direction === Direction.Up) {
            return;
        }
        if(newDirection === Direction.Left && this.direction === Direction.Right) {
            return;
        }
        if(newDirection === Direction.Right && this.direction === Direction.Left) {
            return;
        }
        this.direction = newDirection;
    }

    draw() {
        const bsize = this.bsize;
        const ctx = this.ctx;

        ctx.fillStyle = 'black';

        for(let i = 0; i < SNAKE_INITIAL_LENGTH; i++) {
            const { x, y } = this.tail[i];
            ctx.fillRect(x, y, bsize, bsize);
        }
    }

    getPosition() {
        return this.tail;
    }

}