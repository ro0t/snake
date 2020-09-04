export default class GameLoop {
    constructor(update, draw) {
        this.maxFps = 80;
        this.lastFrameTimeMs = 0;
        this.isGameRunning = false;
        this.update = update;
        this.draw = draw;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.main = this.main.bind(this);
    }

    start() {
        this.isGameRunning = true;
        window.requestAnimationFrame(this.main);
    }

    stop() {
        this.isGameRunning = false;
        window.cancelAnimationFrame(this.lastFrameTimeMs);
    }

    main(timestamp) {
        if( this.isGameRunning ) {
            if(timestamp < this.lastFrameTimeMs + (1000 / this.maxFps)) {
                window.requestAnimationFrame(this.main);
                return;
            }

            this.lastFrameTimeMs = timestamp;
            this.update();
            this.draw();

            window.requestAnimationFrame(this.main);
        }
    }

    once() {
        this.draw();
    }

}