import Raw from './raw'
import { uint8, OPCODES,MARKS,BIT_WIDTHS} from './common/types'
import { CPU_EVENTS } from './common/events'

const createEvent = function(type,payload){
    return {
        type: type,
        payload: typeof payload === 'object' ? {...payload} : {value: payload}
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

    getTmpRegister(){
        return this.tmpRegister;
    }

    setTmpRegisterVal(val){
        this.tmpRegister = val;
    }

    getValByRaw(addr) {
        return Raw.get(addr);
    }

    getOpcodeByInstRegisterVal() {
        const {BIT_WIDTH,OPCODE_WIDTH} = BIT_WIDTHS;

        let instVal = this.instRegister;
        let opcode;
        opcode = instVal & MARKS.OPCODE_MARK;

        opcode = opcode >>> (BIT_WIDTH - OPCODE_WIDTH);

        return opcode;
    }

    getPayloadByInstRegisterVal(){
        const {BIT_WIDTH,OPCODE_WIDTH} = BIT_WIDTHS;

        let instVal = this.instRegister;
        let payload;
        payload = instVal & MARKS.PAYLOAD_MARK;

        return payload;
    }

    executeByOpcode(opcode) {
        const {
            ADD,
            SUB,
            LOAD_A,
            LOAD_B
        } = OPCODES;

        const {
            COMPUTE_BY_ALU,
            SET_REGISTER
        } = CPU_EVENTS;

        const {PAYLOAD_LHS_MARK,PAYLOAD_RHS_MARK} = MARKS;

        const input = this.instRegister;
        let ret = [];
        switch (opcode) {
            case ADD:
            case SUB:
                const payload = this.getPayloadByInstRegisterVal();
                const rhs= payload & PAYLOAD_RHS_MARK;
                const lhs= payload & PAYLOAD_LHS_MARK;

                ret = createEvent(COMPUTE_BY_ALU, {
                    opcode,
                    rhs,
                    lhs,
                    des: rhs,
                })
                break;
            case LOAD_A:
            ret = createEvent(SET_REGISTER,{address: 0,value:0})
                break;
            case LOAD_B:
            ret = createEvent(SET_REGISTER,{address: 1,value:0})
                break;
        }

        return ret;
    }
}