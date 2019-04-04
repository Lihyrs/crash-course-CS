// instruction table
/**
 * | instruction  |         description     | 4-bit opcode | address or registers |
 * --------------------------------------------------------------------------------
 * |    LOAD_A    |     read RAW location   |   0010       |  4-bit Raw address   |
 * |              |     into register A     |              |                      |
 * --------------------------------------------------------------------------------
 * |    LOAD_B    |    read RAW location   |   0001       |  4-bit Raw address   |
 * |              |     into register B    |              |                      |
 * -------------------------------------------------------------------------------
 * |    STORE_A   |  write from register   |   0001       |  4-bit Raw address   |
 * |              |  A into Raw location   |              |                      |
 * -------------------------------------------------------------------------------
 * |    ADD       | add two register value |   0001       |  4-bit Raw address   |
 * |              | into second register   |              |                      |
 * -------------------------------------------------------------------------------
 */

export const INSTRUCTION = {
    LOAD_A: 0010,   //read RAW location into register A
    LOAD_B: 0001,
    STORE_A: 0100,
    ADD: 1000
}

export default INSTRUCTION