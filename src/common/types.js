export const OPCODES = {
    LOAD_A: 0b0010, //read RAW location into register A
    LOAD_B: 0b0001,
    STORE_A: 0b0100,
    ADD: 0b1000,
    SUB: 0b1010,
    JUMP: 0b1100,
    JUMP_NEG: 0b1110,
    HALF: 0b1111,
}

export const uint8 = function () {
    return new Uint8Array(1)[0];
};

//unit is bit
const BIT_WIDTH = 8; //opcode + payload(raw address or register)
const OPCODE_WIDTH = 4;
const PAYLOAD_WIDTH = 4;
const PAYLOAD_LHS_WIDTH = 2;
const PAYLOAD_RHS_WIDTH = 2;

export const BIT_WIDTHS = {
    BIT_WIDTH, //opcode + payload(raw address or register)
    OPCODE_WIDTH,
    PAYLOAD_WIDTH,
    PAYLOAD_LHS_WIDTH,
    PAYLOAD_RHS_WIDTH,
}



//marks
//javascript 读到的值在内存中时不是以8bit存储的
const OPCODE_MARK= (~uint8()) << OPCODE_WIDTH;
const PAYLOAD_MARK= ~((~uint8()) << PAYLOAD_WIDTH);
const PAYLOAD_RHS_MARK= PAYLOAD_MARK >>> PAYLOAD_RHS_WIDTH;
const PAYLOAD_LHS_MARK= PAYLOAD_RHS_MARK << PAYLOAD_LHS_WIDTH;

export const MARKS = {
    OPCODE_MARK,
    PAYLOAD_MARK,
    PAYLOAD_RHS_MARK,
    PAYLOAD_LHS_MARK,
}


export default {
    OPCODES,
    uint8,
    MARKS,
    BIT_WIDTHS
}