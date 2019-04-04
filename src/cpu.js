import {
    uint8,
    OPCODES,
} from './common/types'
import ALU from './alu'
// import Raw from './raw'
import controlUnit from './controlUnit'
import {
    CPU_EVENTS
} from './common/events';

class cpu {
    constructor() {
        this.registerA = uint8();
        this.registerB = uint8();
        this.registerC = uint8();
        this.registerD = uint8();

        this.ALU = new ALU();

        this.controlUnit = new controlUnit(this.ALU.getFlags());
        //时钟以精确的间隔触发电信号,控制单元用此信号来推进CPU工作
        this.clock = null;
        this.status = 0;
    }

    /**
     * 取指令阶段
     * 根据指令地址寄存器存储的地址读取raw相应地址中的值
     * 并将此值存储在指令寄存器中
     */
    fetchPhase() {
        const addr = this.controlUnit.getInstAddressRegisterVal();
        const instVal = this.controlUnit.getValByRaw(addr);
        this.controlUnit.setInstRegister(instVal);
    }

    /**
     * 解码阶段
     * 根据指令寄存器中的值确定操作码
     */
    decodePhase() {
        return this.controlUnit.getOpcodeByInstRegisterVal();
    }

    /**
     * 执行阶段
     * 根据确定的操作码与数据执行操作
     * 最后将指令地址寄存器的值加1
     * 结束一个周期,这个周期(fetch->decode->execute->instAddrRegister++)称为时钟速度
     */
    executePhase(opcode) {

        const event = this.controlUnit.executeByOpcode(opcode);

        const {
            COMPUTE_BY_ALU,
            SET_REGISTER,
        } = CPU_EVENTS;

        const {
            JUMP,
            JUMP_NEG,
            HALF
        } = OPCODES;

        /** 
         * Control Unit select the right register to pass in as input,
         * and configuring the ALU to perform the right operation
         */
        if (event.type === COMPUTE_BY_ALU) {
            const payload = event.payload;
            this.ALU.reset();
            const ret = this.computeByALU(payload.opcode, payload.lhs, payload.rhs);
            /**
             * 将结果缓存,
             * 没有直接更新到目标寄存器是防止ALU一直重复当前操作
             */
            this.controlUnit.setTmpRegisterVal(ret);
            /**
             * 配置ALU后,将缓存结果更新到目标寄存器
             */
            this.setRegister(payload.des, this.controlUnit.getTmpRegisterVal())
        } else if (event.type === SET_REGISTER) {
            this.setRegister(event.payload.address, event.payload.value);
        } else if (event.type === JUMP) {
            this.controlUnit.setInstAddressRegister(event.payload.address)
        } else if (event.type === JUMP_NEG) {
            const flags = this.controlUnit.getALUFlags();
            if (flags.negative) {
                this.controlUnit.setInstAddressRegister(event.payload.address)
            } else {
                //do nothing
            }
        } else if (event.type === HALF) {
            this.status = 0;
        }

        //end
        const addr = this.controlUnit.getInstAddressRegisterVal();
        this.controlUnit.setInstAddressRegister(addr + 1);
    }

    run() {
        console.log(this)
        this.status = 1;
        while (this.status) {
            this.fetchPhase();
            let opcode = this.decodePhase();
            this.executePhase(opcode);
            console.log(this)
        }
    }

    init({
        raw
    }) {
        this.controlUnit.connectRaw(raw);
    }

    computeByALU(opcode, lhs, rhs) {
        const input = {
            lhs: this.getRegisterVal(lhs),
            rhs: this.getRegisterVal(rhs)
        }
        const ret = this.ALU.compute(opcode,input.lhs,input.rhs);
        const flags = this.ALU.getFlags();
        if (flags.overflow) {
            console.log("overflow: ${lhs} ${rhs}")
        }
        this.controlUnit.setALUFlags(this.ALU.getFlags());
        return ret;
    }

    setRegister(addr, val) {
        switch (addr) {
            case 0:
                this.registerA = val;
                break;
            case 1:
                this.registerB = val;
                break;
            case 2:
                this.registerC = val;
                break;
            case 3:
                this.registerD = val;
                break;
            default:
                throw new Error('unexpected register')
        }
    }

    getRegisterVal(addr){
        let ret;
        switch (addr) {
            case 0:
               ret = this.registerA;
                break;
            case 1:
               ret = this.registerB;
                break;
            case 2:
               ret = this.registerC;
                break;
            case 3:
               ret = this.registerD;
                break;
            default:
                throw new Error('unexpected register')
        }

        return ret;
    }
}

export default cpu;