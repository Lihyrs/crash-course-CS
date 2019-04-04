import {
    uint8,
    OPCODES,
    MARKS,
    BIT_WIDTHS
} from './common/types'
import {
    CPU_EVENTS
} from './common/events'

const createEvent = function (type, payload) {
    return {
        type: type,
        payload: typeof payload === 'object' ? {
            ...payload
        } : {
            value: payload
        }
    }
};

// simple control unit
class controlUnit {
    constructor(flags = {}) {

        /**
         * instruction register
         * stores the current instruction
         * 指令寄存器
         */
        this.instRegister = uint8();

        /** 
         * instruction address register,
         * stores the memory address of the current instruction
         * 指令地址寄存器
         */
        this.instAddrRegister = uint8();

        this.ALUFlags = flags;

        this.rawHnd = null;

        this.tmpRegister = uint8();
    }

    getInstAddressRegisterVal() {
        return this.instAddrRegister;
    }

    setInstAddressRegister(addr) {
        this.instAddrRegister = addr;
    }

    getInstRegisterVal() {
        return this.instRegister;
    }

    setInstRegister(val) {
        this.instRegister = val;
    }

    setALUFlags(obj = {}) {
        this.ALUFlags = {
            ...this.ALUFlags,
            ...obj
        }
    }

    getALUFlags() {
        return {
            ...this.ALUFlags
        };
    }

    getTmpRegisterVal() {
        return this.tmpRegister;
    }

    setTmpRegisterVal(val) {
        this.tmpRegister = val;
    }

    getValByRaw(addr) {
        return this.rawHnd.get(addr);
    }

    connectRaw(raw) {
        this.rawHnd = raw;
    }

    getOpcodeByInstRegisterVal() {
        const {
            BIT_WIDTH,
            OPCODE_WIDTH
        } = BIT_WIDTHS;

        let instVal = this.instRegister;
        let opcode;
        opcode = instVal & MARKS.OPCODE_MARK;

        opcode = opcode >>> (BIT_WIDTH - OPCODE_WIDTH);

        return opcode;
    }

    getPayloadByInstRegisterVal() {

        let instVal = this.instRegister;
        let payload;
        // console.log(instVal,MARKS.PAYLOAD_MARK)
        payload = instVal & MARKS.PAYLOAD_MARK;

        return payload;
    }

    consoleLogComment(opcode) {
        const {
            ADD,
            LOAD_A,
            LOAD_B,
            JUMP,
            JUMP_NEG,
            HALF,
            STORE_A
        } = CPU_EVENTS;
        const log = function () {
            const args = [...arguments];
            console.log(args.join(' '));
        }
        switch (opcode) {
            case OPCODES.ADD:
                log(ADD);
                break;
            case OPCODES.SUB:
                log(SUB);
                break;
            case OPCODES.LOAD_A:
                log(LOAD_A);
                break;
            case OPCODES.LOAD_B:
                log(LOAD_B);

                break;
            case OPCODES.JUMP:
                log(JUMP);

                break;
            case OPCODES.JUMP_NEG:
                log(JUMP_NEG);
                break;
            case OPCODES.HALF:
                log(HALF);
                break;
            case OPCODES.STORE_A:
                log(STORE_A);
                break;
            default:
                // do nothing
        }
    }

    executeByOpcode(opcode) {
        const {
            ADD,
            SUB,
            LOAD_A,
            LOAD_B,
            JUMP,
            JUMP_NEG,
            HALF
        } = OPCODES;

        const {
            COMPUTE_BY_ALU,
            SET_REGISTER
        } = CPU_EVENTS;

        const {
            PAYLOAD_LHS_MARK,
            PAYLOAD_RHS_MARK
        } = MARKS;

        // const input = this.instRegister;
        const payload = this.getPayloadByInstRegisterVal();
        let ret = [];
        let logText = [];
        switch (opcode) {
            case ADD:
            case SUB:
                const rhs = payload & PAYLOAD_RHS_MARK;
                const lhs = (payload & PAYLOAD_LHS_MARK) >>>(BIT_WIDTHS.PAYLOAD_RHS_WIDTH );
                logText.push(lhs);
                logText.push(rhs);

                ret = createEvent(COMPUTE_BY_ALU, {
                    opcode,
                    rhs,
                    lhs,
                    des: rhs,
                });
                break;
            case LOAD_A:
                ret = createEvent(SET_REGISTER, {
                    address: 0,
                    value: payload
                });
                logText.push(payload)
                break;
            case LOAD_B:
                ret = createEvent(SET_REGISTER, {
                    address: 1,
                    value: payload
                });
                logText.push(payload)
                break;
            case JUMP:
                ret = createEvent(JUMP, {
                    address: payload
                });
                logText.push(payload)
                break;
            case JUMP_NEG:
                ret = createEvent(JUMP_NEG, {
                    address: payload
                });
                logText.push(payload)
                break;
            case HALF:
                ret = createEvent(HALF, {
                    //no thing
                });
                break;
            default:
                // console.error('unexpected instruction')
                throw new Error("unexpected instruction: " + opcode)
                // do nothing
        }

        this.consoleLogComment(opcode,...logText);

        return ret;
    }
}

export default controlUnit;