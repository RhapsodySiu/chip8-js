import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constants.js";

const OPIDS ={
    CLS: 'CLS',
    DRW_VX_VY_NIBBLE: 'DRW_VX_VY_NIBBLE',

    // Non UI
    RET: 'RET',
    JP_ADDR: 'JP_ADDR',
    CALL_ADDR: 'CALL_ADDR',
    SUB_VX_VY: 'SUB_VX_VY',
    SE_VX_NN: 'SE_VX_NN',
    SNE_VX_NN: 'SNE_VX_NN',
    SE_VX_VY: 'SE_VX_VY',
    LD_VX_NN: 'LD_VX_NN',
    ADD_VX_BYTE: 'ADD_VX_BYTE',
    LD_VX_VY: 'LD_VX_VY',
    OR_VX_VY: 'OR_VX_VY',
    AND_VX_VY: 'AND_VX_VY',
    XOR_VX_VY: 'XOR_VX_VY',
    ADD_VX_VY: 'ADD_VX_VY',
    ADD_VX_BYTE: 'ADD_VX_BYTE',
    SHR_VX_VY: 'SHR_VX_VY',
    SUBN_VX_VY: 'SUBN_VX_VY',
    SHL_VX_VY: 'SHL_VX_VY',
    SNE_VX_VY: 'SNE_VX_VY',
    LD_I_ADDR: 'LD_I_ADDR',
    JP_V0_ADDR: 'JP_V0_ADDR',
    RND_VX_BYTE: 'RND_VX_BYTE',
    SKP_VX: 'SKP_VX',
    SKNP_VX: 'SKNP_VX',
    LD_VX_DT: 'LD_VX_DT',
    LD_VX_KEY: 'LD_VX_KEY',
    LD_DT_VX: 'LD_DT_VX',
    LD_ST_VX: 'LD_ST_VX',
    ADD_I_VX: 'ADD_I_VX',
    LD_F_VX: 'LD_F_VX',
    LD_B_VX: 'LD_B_VX',
    LD_I_VX: 'LD_I_VX',
    LD_VX_I: 'LD_VX_I',
}
const OPCODES = {
    [OPIDS.CLS]: 0x00E0, // Clear the display
    [OPIDS.RET]: 0x00EE, // Return from a subroutine
    [OPIDS.JP_ADDR]: 0x1000, // 1nnn - Jump to location nnn
    [OPIDS.CALL_ADDR]: 0x2000, // 2nnn - Call subroutine at nnn
    [OPIDS.SE_VX_NN]: 0x3000, // 3xkk - Skip next instruction if Vx = kk
    [OPIDS.SNE_VX_NN]: 0x4000, // 4xkk - Skip next instruction if Vx != kk
    [OPIDS.SE_VX_VY]: 0x5000, // 5xy0 - Skip next instruction if Vx = Vy
    [OPIDS.LD_VX_NN]: 0x6000, // 6xkk - Set Vx = kk
    [OPIDS.ADD_VX_BYTE]: 0x7000, // 7xkk - Set Vx = Vx + kk
    [OPIDS.LD_VX_VY]: 0x8000, // 8xy0 - Set Vx = Vy
    [OPIDS.OR_VX_VY]: 0x8001, // 8xy1 - Set Vx = Vx OR Vy
    [OPIDS.AND_VX_VY]: 0x8002, // 8xy2 - Set Vx = Vx AND Vy
    [OPIDS.XOR_VX_VY]: 0x8003, // 8xy3 - Set Vx = Vx XOR Vy
    [OPIDS.ADD_VX_VY]: 0x8004, // 8xy4 - Set Vx = Vx + Vy, set VF = carry
    [OPIDS.SUB_VX_VY]: 0x8005, // 8xy5 - Set Vx = Vx - Vy, set VF = NOT borrow
    [OPIDS.SHR_VX_VY]: 0x8006, // 8xy6 - Set Vx = Vx SHR 1, set VF = LSB
    [OPIDS.SUBN_VX_VY]: 0x8007, // 8xy7 - Set Vx = Vy - Vx, set VF = NOT borrow
    [OPIDS.SHL_VX_VY]: 0x800E, // 8xyE - Set Vx = Vx SHL 1
    [OPIDS.SNE_VX_VY]: 0x9000, // 9xy0 - Skip next instruction if Vx != Vy
    [OPIDS.LD_I_ADDR]: 0xA000, // Annn - Set I = nnn
    [OPIDS.JP_V0_ADDR]: 0xB000, // Bnnn - Jump to location nnn + V0
    [OPIDS.RND_VX_BYTE]: 0xC000, // Cxkk - Set Vx = random byte AND kk
    [OPIDS.DRW_VX_VY_NIBBLE]: 0xD000, // Dxyn - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
    [OPIDS.SKP_VX]: 0xE09E, // Ex9E - Skip next instruction if key with the value of Vx is pressed
    [OPIDS.SKNP_VX]: 0xE0A1, // ExA1 - Skip next instruction if key with the value of Vx is not pressed
    [OPIDS.LD_VX_DT]: 0xF007, // Fx07 - Set Vx = delay timer value
    [OPIDS.LD_VX_KEY]: 0xF00A, // Fx0A - Wait for a key press, store the value of the key in Vx
    [OPIDS.LD_DT_VX]: 0xF015, // Fx15 - Set delay timer = Vx
    [OPIDS.LD_ST_VX]: 0xF018, // Fx18 - Set sound timer = Vx
    [OPIDS.ADD_I_VX]: 0xF01E, // Fx1E - Set I = I + Vx
    [OPIDS.LD_F_VX]: 0xF029, // Fx29 - Set I = location of sprite for digit Vx
    [OPIDS.LD_B_VX]: 0xF033, // Fx33 - Store BCD representation of Vx in memory locations I, I+1, and I+2
    [OPIDS.LD_I_VX]: 0xF055, // Fx55 - Store registers V0 to Vx in memory starting at location I
    [OPIDS.LD_VX_I]: 0xF065, // Fx65 - Read registers V0 to Vx from memory starting at location I
}

const INSTRUCTION_SET = [
    {
        id: OPIDS.CLS,
        name: 'CLS',
        mask: 0xFFFF,
        pattern: OPCODES[OPIDS.CLS],
    },
    {
        id: OPIDS.RET,
        name: 'RET',
        mask: 0xffff,
        pattern: OPCODES[OPIDS.RET],
    },
    {
        id: OPIDS.JP_ADDR,
        name: 'JP',
        mask: 0xf000,
        pattern: OPCODES[OPIDS.JP_ADDR],
        arguments: [
            { mask: 0x0FFF, shift: 0, type: 'A' },
        ],
    },
    {
        id: OPIDS.CALL_ADDR,
        name: 'CALL',
        pattern: OPCODES[OPIDS.CALL_ADDR],
        mask: 0xf000,
        arguments: [
            { mask: 0x0FFF, shift: 0, type: 'A' },
        ],
    },
    {
        id: OPIDS.SE_VX_NN,
        name: 'SE',
        pattern: OPCODES[OPIDS.SE_VX_NN],
        mask: 0xf000,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00FF, shift: 0, type: 'NN' },
        ],
    },
    {
        id: OPIDS.SNE_VX_NN,
        name: 'SNE',
        pattern: OPCODES[OPIDS.SNE_VX_NN],
        mask: 0xf000,
        arguemnts: [
            { mask: 0x0f00, shift: 8, type: 'R' },
            { mask: 0x00f0, shift: 0, type: 'NN' },
        ],
    },
    {
        id: OPIDS.SE_VX_VY,
        name: 'SE',
        pattern: OPCODES[OPIDS.SE_VX_VY],
        mask: 0xf00f,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ],
    },
    {
        id: OPIDS.LD_VX_NN,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_VX_NN],
        mask: 0xf000,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00FF, shift: 0, type: 'NN' },
        ],
    },
    {
        id: OPIDS.ADD_VX_BYTE,
        name: 'ADD',
        pattern: OPCODES[OPIDS.ADD_VX_BYTE],
        mask: 0xf000,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00FF, shift: 0, type: 'NN' },
        ],
    },
    {
        id: OPIDS.LD_VX_VY,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_VX_VY],
        mask: 0xf00f,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ],
    },
    {
        id: OPIDS.OR_VX_VY,
        name: 'OR',
        pattern: OPCODES[OPIDS.OR_VX_VY],
        mask: 0xf00f,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ],
    },
    {
        id: OPIDS.AND_VX_VY,
        name:'AND',
        pattern : OPCODES[OPIDS.AND_VX_VY],
        mask : 0xf00f,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            {mask : 0x00F0, shift : 4, type : 'R'},
        ]
    },
    {
        id : OPIDS.XOR_VX_VY,
        name : 'XOR',
        pattern : OPCODES[OPIDS.XOR_VX_VY],
        mask : 0xf00f,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            {mask : 0x00F0, shift : 4, type : 'R'},
        ],
    },
    {
        id: OPIDS.ADD_VX_VY,
        name: 'ADD',
        pattern: OPCODES[OPIDS.ADD_VX_VY],
        mask: 0xF00F,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' }, // Vx
            { mask: 0x00F0, shift: 4, type: 'R' }, // Vy
        ],
    },
    {
        id: OPIDS.SUB_VX_VY,
        name: 'SUB',
        mask: 0XF00F,
        pattern: OPCODES[OPIDS.SUB_VX_VY],
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ]
    },
    {
        id: OPIDS.SHR_VX_VY,
        name: 'SHR',
        pattern: OPCODES[OPIDS.SHR_VX_VY],
        mask: 0xF00F,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ],
    },
    {
        id: OPIDS.SUBN_VX_VY,
        name: 'SUBN',
        pattern: OPCODES[OPIDS.SUBN_VX_VY],
        mask: 0xF00F,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00F0, shift: 4, type: 'R' },
        ],
    },
    {
        id : OPIDS.SHL_VX_VY,
        name : 'SHL',
        pattern : OPCODES[OPIDS.SHL_VX_VY],
        mask : 0xf00f,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            {mask : 0x00F0, shift : 4, type : 'R'},
        ]
    },
    {
        id : OPIDS.SNE_VX_VY,
        name : 'SNE',
        pattern : OPCODES[OPIDS.SNE_VX_VY],
        mask : 0xf00f,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            {mask : 0x00F0, shift : 4, type : 'R'},
        ]
    },
    {
        id: OPIDS.LD_I_ADDR,
        name:'LD',
        pattern : OPCODES[OPIDS.LD_I_ADDR],
        mask : 0xf000,
        arguments:[
            // { mask : 0x0000, shift : 0, type : 'I' },
            { mask : 0x0FFF, shift : 0, type : 'A' },
        ],
    },
    {
        id: OPIDS.JP_V0_ADDR,
        name: 'JP',
        pattern: OPCODES[OPIDS.JP_V0_ADDR],
        mask: 0xF000,
        arguments: [
            // { mask: 0x0000, shift: 0, type: 'V0' },
            { mask: 0x0FFF, shift: 0, type: 'A' },
        ],
    },
    {
        id: OPIDS.RND_VX_BYTE,
        name: 'RND',
        pattern: OPCODES[OPIDS.RND_VX_BYTE],
        mask: 0xF000,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00FF, shift: 0, type: 'NN' },
        ],
    },
    {
        id: OPIDS.DRW_VX_VY_NIBBLE,
        name: 'DRW',
        pattern: OPCODES[OPIDS.DRW_VX_VY_NIBBLE],
        mask: 0xF000,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' }, // Vx
            { mask: 0x00F0, shift: 4, type: 'R' }, // Vy
            { mask: 0x000F, shift: 0, type: 'R' }, // N
        ],
    },
    {
        id: OPIDS.SKP_VX,
        name: 'SKP',
        mask: 0xF0FF,
        pattern: OPCODES[OPIDS.SKP_VX],
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
        ]
    },
    {
        id: OPIDS.SKNP_VX,
        name: 'SKNP',
        mask: 0xF0FF,
        pattern: OPCODES[OPIDS.SKNP_VX],
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
        ]
    },
    {
        id: OPIDS.LD_VX_DT,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_VX_DT],
        mask: 0xF00F,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            { mask: 0x00FF, shift: 0, type: 'DT' },
        ],
    },
    {
        id: OPIDS.LD_VX_KEY,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_VX_KEY],
        mask: 0xF00F,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            // { mask: 0x0000, shift: 0, type: 'KEY' },
        ],
    },
    {
        id : OPIDS.LD_DT_VX,
        name : 'LD',
        pattern : OPCODES[OPIDS.LD_DT_VX],
        mask : 0xf0ff,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            // {mask : 0x0000, shift : 0, type : 'DT'},
        ]
    },
    {
        id : OPIDS.LD_ST_VX,
        name : 'LD',
        pattern : OPCODES[OPIDS.LD_ST_VX],
        mask : 0xf0ff,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            // {mask : 0x0000, shift : 0, type : 'ST'},
        ]
    },
    {
        id : OPIDS.ADD_I_VX,
        name : 'ADD',
        pattern : OPCODES[OPIDS.ADD_I_VX],
        mask : 0xf0ff,
        arguments : [
            {mask : 0x0F00, shift : 8, type : 'R'},
            // {mask : 0x0000, shift : 0, type : 'I'},
        ]
    },
    {
        id: OPIDS.LD_F_VX,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_F_VX],
        mask: 0xF0FF,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            // { mask: 0x0000, shift: 0, type: 'I' },
        ],
    },
    {
        id: OPIDS.LD_B_VX,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_B_VX],
        mask: 0xF0FF,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            // { mask: 0x0000, shift: 0, type: 'B' },
        ],
    },
    {
        id: OPIDS.LD_I_VX,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_I_VX],
        mask: 0xF0FF,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            // { mask: 0x0000, shift: 0, type: 'I' },
        ],
    },
    {
        id: OPIDS.LD_VX_I,
        name: 'LD',
        pattern: OPCODES[OPIDS.LD_VX_I],
        mask: 0xF0FF,
        arguments: [
            { mask: 0x0F00, shift: 8, type: 'R' },
            // { mask: 0x0000, shift: 0, type: 'I' },
        ],
    }
];

export class CpuInterface {
    constructor() {
        if (new.target === CpuInterface) {
            throw new TypeError('Cannot instantiate abstract class');
        }

        /**
         * binary number consiting of 16 digits
         * 0b1000000000000000 keyMap[15]
         * 0b0000000000000011 keyMap[0,1]
         */
        this.keys = 0;
    }

    clearDisplay() {
        throw new TypeError('Must be implemented on the inherited class');
    }

    waitKey() {
        throw new TypeError('Must be implemented on the inherited class');
    }

    getKeys() {
        throw new TypeError('Must be implemented on the inherited class');
    }

    drawPixel(x, y, value) {
        throw new TypeError('Must be implemented on the inherited class');
    }

    enableSound() {
        throw new TypeError('Must be implemented on the inherited class');
    }

    disableSound() {
        throw new TypeError('Must be implemented on the inherited class');
    }
}

export class CPU {
    constructor(cpuInterface) {
        this.interface = cpuInterface;

        this.reset();
    }

    reset() {
        this.memory = new Uint8Array(4096); // 4KB of memory
        this.registers = new Uint8Array(16); // 16 registers (V0 to VF)
        this.stack = new Uint16Array(16); // Stack for subroutine calls
        this.PC = 0x200; // Program counter starts at 0x200
        this.I = 0; // Interpreter register
        this.SP = -1; // Stack pointer
        this.DT = 0; // Delay timer
        this.ST = 0; // Sound timer
    }

    load(romBuffer) {
        this.reset();

        // TODO: reserve 0-80 in memory for font set

        // Get ROM data from ROM buffer
        const romData = romBuffer.data;
        let memoryStart = 0x200;

        this.halted = false;

        // memory is stored in an 8-bit array and opcodes are 16-bit, 
        // store the opcodes across two indices in memory
        for (let i = 0; i < romData.length; i++) {
            this.memory[memoryStart + 2 * i] = romData[i] >> 8;
            this.memory[memoryStart + 2 * i + 1] = romData[i] & 0x00FF;
        }
    }

    tick() {
        if (this.DT > 0) {
            // Decrement the delay timer by one until it reaches 0
            this.DT--
        }

        if (this.ST > 0) {
            // Sound timer is active whenever its value is non-zero
            this.ST--;
        } else {
            // deactivate it when it becomes zero
            if (this.soundEnabled) {
                this.interface.disableSound();
                this.soundEnabled = false;
            }
        }
    }

    halt() {
        this.halted = true;
    }

    step() {
        if (this.halted) {
            throw new Error('The program is halted');
        }

        const opcode = this._fetch();
        const operation = this._decode(opcode);
        const execute = this._execute(operation);
    }

    _fetch() {
        if (this.PC > 4096) {
            this.halt();
            throw new Error('Memory out of bounds');
        }

        // Combine two bytes in the memory back into one big endian opcode
        return (this.memory[this.PC] << 8) | this.memory[this.PC + 1];
    }

    _decode(opcode) {
        return disassemble(opcode);
    }

    _nextInstruction() {
        this.PC += 2;
    }

    _skipInstruction() {
        this.PC += 4;
    }

    _execute(operation) {
        const { args, instruction } = operation;
        const { id } = instruction;

        switch (id) {
            case OPIDS.CLS:
                this.interface.clearDisplay();
                this._nextInstruction();
                break;

            case OPIDS.RET:
                if (this.SP === -1) {
                    this.halt();
                    throw new Error('Stack underflow.');
                }

                this.PC = this.stack[this.SP];
                this.SP--;
                break;

            case OPIDS.JP_ADDR:
                this.PC = args[0];
                break;
            
            case OPIDS.CALL_ADDR:
                if (this.SP === 15) {
                    this.halt();
                    throw new Error('Stack overflow.');
                }

                this.SP++;
                this.stack[this.SP] = this.PC + 2;
                this.PC = args[0];
                break;

            case OPIDS.SE_VX_NN:
                if (this.registers[args[0]] === args[1]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;
            
            case OPIDS.SNE_VX_NN:
                if (this.registers[args[0]] !== args[1]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;
            
            case OPIDS.SE_VX_VY:
                if (this.registers[args[0]] === this.registers[args[1]]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;

            case OPIDS.LD_VX_NN:
                this.registers[args[0]] = args[1];
                this._nextInstruction();
                break;
            
            case OPIDS.ADD_VX_BYTE:
                this.registers[args[0]] += args[1];
                this._nextInstruction();
                break;

            case OPIDS.LD_VX_VY:
                this.registers[args[0]] = this.registers[args[1]];
                this._nextInstruction();
                break;

            case OPIDS.OR_VX_VY:
                this.registers[args[0]] |= this.registers[args[1]];
                this._nextInstruction();
                break;

            case OPIDS.AND_VX_VY:
                this.registers[args[0]] &= this.registers[args[1]];
                this._nextInstruction();
                break;

            case OPIDS.XOR_VX_VY:
                this.registers[args[0]] ^= this.registers[args[1]];
                this._nextInstruction();
                break;

            case OPIDS.ADD_VX_VY:
                // Perform the instruction operation
                this.registers[args[0]] += this.registers[args[1]];
                this._nextInstruction();
                break;

            case OPIDS.SUB_VX_VY:
                this.registers[args[0]] -= this.registers[args[1]];
                this._nextInstruction();
                break;
            
            case OPIDS.SHR_VX_VY:
                this.registers[0xf] = this.registers[args[0]] & 1;
                this.registers[args[0]] >>= 1

                this._nextInstruction();
                break;

            case OPIDS.SUBN_VX_VY:
                this.registers[0xf] = this.registers[args[1]] > this.registers[args[0]] ? 1 : 0;

                this.registers[args[0]] = this.registers[args[1]] - this.registers[args[0]];
                this._nextInstruction();
                break;
            
            case OPIDS.SHL_VX_VY:
                this.registers[0xf] = this.registers[args[0]] >> 7;
                this.registers[args[0]] <<= 1;
                this._nextInstruction();
                break;

            case OPIDS.SNE_VX_VY:
                if (this.registers[args[0]] !== this.registers[args[1]]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;
            
            case OPIDS.LD_I_ADDR:
                this.I = args[0];
                this._nextInstruction();
                break;

            case OPIDS.JP_V0_ADDR:
                this.PC = args[0] + this.registers[0x0];
                break;

            case OPIDS.RND_VX_BYTE:
                const random = Math.floor(Math.random() * 0xff);
                this.registers[args[0]] = random & args[1];
                this._nextInstruction();
                break;
            
            case OPIDS.DRW_VX_VY_NIBBLE:
                if (this.I > 4095 - args[2]) {
                    this.halt();
                    throw new Error('Memory out of bound.');
                }

                // if no pixels are erased, set VF to 0
                this.registers[0xf] = 0;

                // Read n bytes of memory
                for (let i = 0; i < args[2]; ++i) {
                    const line = this.memory[this.I + i];
                    // each byte = a line of 8 pixels
                    for (let j = 0; j < 8; ++j) {
                        const value = line & (1 << (7-j)) ? 1 : 0;
                        const x = (this.registers[args[0]] + j) % DISPLAY_WIDTH;
                        const y = (this.registers[args[1]] + i) % DISPLAY_HEIGHT;

                        // if this causes any pixels to be erased, VF is set to 1
                        if (this.interface.drawPixel(x, y, value)) {
                            this.registers[0xf] = 1;
                        }
                    }
                }

                break;
            
            case OPIDS.SKP_VX:
                if (this.interface.getKeys() & (1 << this.registers[args[0]])) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;

            case OPIDS.SKNP_VX:
                if (!(this.interface.getKeys() & (1 << this.registers[args[0]]))) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                }
                break;

            case OPIDS.LD_VX_DT:
                this.registers[args[0]] = this.DT;
                this._nextInstruction();
                break;

            case OPIDS.LD_VX_KEY:
                const keyPress = this.interface.waitKey();

                if (!keyPress) {
                    return;
                }

                this.registers[args[0]] = keyPress;
                this._nextInstruction();
                break;

            case OPIDS.LD_DT_VX:
                this.DT = this.registers[args[0]];
                this._nextInstruction();
                break;

            case OPIDS.LD_ST_VX:
                this.ST = this.registers[args[0]];
                this._nextInstruction();
                break;

            case OPIDS.ADD_I_VX:
                this.I += this.registers[args[0]];
                this._nextInstruction();
                break;

            case OPIDS.LD_F_VX:
                if (this.registers[args[0]] > 0xf) {
                    this.halt();
                    throw new Error('Invalid digit');
                }
                
                this.I = this.registers[args[0]] * 5;
                this._nextInstruction();
                break;

            case OPCODES.LD_B_VX:
                // BCD = binary-coded decimal
                // eg. VX = 0xef or 239; then 2, 3, and 9 in I, I+1, I+2 address in memory
                let x = this.registers[args[0]]
                const a = Math.floor(x / 100)
                x = x - a * 100;
                const b = Math.floor(x / 10);
                x = x - b * 10;
                const c = Math.floor(x);

                this.memory[this.I] = a;
                this.memory[this.I + 1] = b;
                this.memory[this.I + 2] = c;

                this._nextInstruction();
                break;

            case OPIDS.LD_I_VX:
                if (this.I > 4095 - args[0]) {
                    this.halt();
                    throw new Error('Memory out of bound');
                }

                for (let i = 0; i <= args[0]; ++i) {
                    this.memory[this.I + i] = this.registers[i];
                }

                this._nextInstruction();
                break;

            case OPIDS.LD_VX_I:
                if (this.I > 4095 - args[0]) {
                    this.halt();
                    throw new Error('Memory out of bound');
                }

                for (let i = 0; i <= args[0]; ++i) {
                    this.registers[i] = this.memory[this.I + i];
                }

                this._nextInstruction();
                break;

            // Add more cases for other instructions
            default:
                this.halt();
                throw new Error(`Unknown instruction "${id}"`);
        }
    }
}

function disassemble(opcode) {
    const instruction = INSTRUCTION_SET.find(ins => (opcode & ins.mask) === ins.pattern);

    if (!instruction || !instruction.arguments) {
        throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
    }

    const args = instruction.arguments.map(arg => {
        return (opcode & arg.mask) >> arg.shift;
    });

    return { instruction, args };
}
