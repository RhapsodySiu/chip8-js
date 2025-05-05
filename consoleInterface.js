import blessed from 'blessed';

import { CpuInterface } from "./chip8.js";
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./constants.js";
import { KEY_MAP } from "./keymap.js";

export class ConsoleInterface extends CpuInterface {
    constructor() {
        super();

        this.frameBuffer = this.createFrameBuffer()
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'CHIP 8 TUI',
        });

        this.keys = 0;
        this.keyPressed = undefined;

        this.soundEnabled = false;
        
        this.screen.key(['C-c'], () => {
            this.screen.destroy();
            process.exit(0);
        })

        this.screen.on('keypress', (_, key) => {
            const keyIndex = KEY_MAP.indexOf(key.full);

            if (keyIndex > -1) {
                this._setKeys(keyIndex);
            }
        })

        setInterval(() => {
            this.resetKeys();
        }, 100);
    }

    _setKeys(idx) {
        const keyMask = 1 << keyIndex;

        this.keys = this.keys | keyMask;
        this.keyPressed = keyIndex;
    }

    resetKeys() {
        this.keys = 0b0;
    }

    waitKey() {
        const keyPressed = this.keyPressed;
        this.keyPressed = undefined;

        return keyPressed;
    }

    createFrameBuffer() {
        let frameBuffer = [];

        for (let i = 0; i < DISPLAY_WIDTH; ++i) {
            frameBuffer.push([]);

            for (let j = 0; j < DISPLAY_HEIGHT; ++j) {
                frameBuffer[i].push(0);
            }
        }

        return frameBuffer;
    }

    // Update a single pixel with (0 or 1)
    drawPixel(x, y, value) {
        const collision = this.frameBuffer[y][x] & value;
        
        this.frameBuffer[y][x] ^= value;

        if (this.frameBuffer[y][x]){
            this.screen.fillRegion(blessed.helpers.attrToBinary({
                fg: 'blue'
              }), '█', x, x+1, y, y+1)
        } else {
            this.screen.clearRegion(x, x+1, y, y+1);
        }

        this.screen.render();

        return collision;
    }

    getKeys() {
        return this.keys;
    }

    render() {
        this.screen.render();
    }
}
