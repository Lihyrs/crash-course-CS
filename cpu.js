import {uint8,operaCodes} from './common/types'
import ALU from './alu'
import Raw from './raw'
import controlUnit from './controlUnit'

class cpu {
    constructor() {
        this.registerA = uint8();
        this.registerB = uint8();
        this.registerC = uint8();
        this.registerD = uint8();

        this.ALU = new ALU();

        this.controlUnit = new controlUnit(this.ALU.getFlags());

        //instruction register
        //指令寄存器
        this.instRegister = uint8();
        //instruction address register
        //指令地址寄存器
        this.instAddrRegister = uint8();
    }

    /**
     * 取指令阶段
     * 根据指令地址寄存器存储的地址读取raw相应地址中的值
     * 并将此值存储在指令寄存器中
     */
    fetchPhase() {
        // this.controlUnit.doGetInstVal();
        this.instRegister = Raw.get(this.instAddrRegister);
    }

    /**
     * 解码阶段
     * 根据指令寄存器中的值确定操作码
     */
    decodePhase() {
        let mask = ~uint8();
        // let instVal = this.controlUnit.getInstVal();
        let instVal = this.instRegister;
        let operaCode;
        mask = mask<<4;
        operaCode = instVal & mask;
        operaCode = operaCode>>>4;
        return operaCode;
    }

    /**
     * 执行阶段
     * 根据确定的操作码与数据执行操作
     * 最后将指令地址寄存器的值加1
     * 结束一个周期,这个周期(fetch->decode->execute->instAddrRegister++)称为时钟速度
     */
    executePhase(operaCode) {
        const {ADD,SUB,LOAD_A,LOAD_B} = operaCodes;
        switch(operaCode){
            case ADD:
            case SUB:
           this.computeByALU(operaCode);
            break;
            case LOAD_A:
            break;
            case LOAD_B:
            break;
        }
        //do something
        this.instAddrRegister++;
        //end
    }

    computeByALU(operaCode){
        const inputMask = (~uint8())>>>4;
        const inputBMask = inputMask >>> 2;
        const inputAMask = inputB <<2;
        const input = this.instRegister & inputMask;
        const inputA = input & inputAMask;
        const inputB = input & inputBMask;

        this.ALU.compute(operaCode,inputA,inputB);
        this.controlUnit.setFlags(this.ALU.getFlags());
    }


}