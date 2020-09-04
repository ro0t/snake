import {roundTo, xy} from "../helpers/functions";

export default class Fruit {

    constructor(context, sizes) {
        this.ctx = context;
        this.gameSize = {
            width: sizes.width,
            height: sizes.height,
        };
        this.bsize = sizes.block;
        this.position = null;
    }

    update() {
        if(this.position === null) {
            // Find new position and draw
            //const randomX = Math.floor(Math.random() * (this.gameSize.width / this.bsize)) + 1;
            //const randomY = Math.floor(Math.random() * (this.gameSize.height / this.bsize)) + 1;

            this.position = xy(40*this.bsize, this.bsize);
        }
    }

    draw() {
        if(this.position !== null) {
            const bs = this.bsize;
            this.ctx.fillRect(this.position.x, this.position.y, bs, bs);
        }
    }

    collides(position) {
        let x = position.x;
        let y = position.y;
        let px = this.position.x;
        let py = this.position.y;

        if(px === x && py === y) {
            console.log({x,y,px,py});
            this.position = null;
            return true;
        }

        return false;
    }
}