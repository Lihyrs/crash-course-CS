export const OPCODES = {
    LOAD_A: 0010,   //read RAW location into register A
    LOAD_B: 0001,
    STORE_A: 0100,
    ADD: 1000,
    SUB: 1010
}

export const uint8 = function () {
    return new Uint8Array(1)[0];
};

//unit is bit
export const BIT_WIDTHS = {
     BIT_WIDTH : 8, //opcode + payload(raw address or register)
     OPCODE_WIDTH : 4,
     PAYLOAD_WIDTH : 4,
     PAYLOAD_LHS_WIDTH : 2,
     PAYLOAD_RHS_WIDTH : 2,
}


//marks
export const MARKS = {
     OPCODE_MARK : (~uint8()) << OPCODE_WIDTH,
     PAYLOAD_MARK : (~uint8()) >>> PAYLOAD_WIDTH,
     PAYLOAD_RHS_MARK : PAYLOAD_MARK >>> PAYLOAD_RHS_WIDTH,
     PAYLOAD_LHS_MARK : PAYLOAD_RHS_MARK << PAYLOAD_LHS_WIDTH,
}


export default {
    OPCODES,
    uint8,
    MARKS,
    BIT_WIDTHS
}