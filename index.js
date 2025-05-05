import fs from 'fs';

import blessed from 'blessed';

import { CPU, CpuInterface } from './chip8.js';
import { ConsoleInterface } from './consoleInterface.js';
import { KEY_MAP } from './keymap.js';
import RomBuffer from './romBuffer.js';

function main() {
    console.log('READING FILE..');
    const fileContent = fs.readFileSync('./WALL');    
    const tui = new ConsoleInterface();
    const cpu = new CPU(tui);
    const romBuffer = new RomBuffer(fileContent);

    cpu.load(romBuffer)

    let timer = 0;

    function cycle() {
        try {
            timer++;
            if (timer % 5 === 0) {
                cpu.tick();
                timer = 0
            }

            cpu.step();

            setTimeout(cycle, 3);
        } catch (error) {
            fs.appendFileSync('debug.error', error.toString() + '\n', 'utf8');
            console.error('Error occurred. Check debug.error for details.');
        }
    }

    cycle();
}

main();