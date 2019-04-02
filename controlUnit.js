import Raw from './raw'

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
    }

    decodePhase(){
        let mask = ~uint8();
        // let instVal = this.controlUnit.getInstVal();
        let instVal = this.instRegister;
        let operaCode;
        mask = mask<<4;
        operaCode = instVal & mask;
        operaCode = operaCode>>>4;
        return operaCode;
    }

    executePhase(){
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

    doGetInstVal() {
        this.instRegister = Raw.get(this.instAddrRegister);
    }

    getInstAddress() {
        return this.instAddrRegister;
    }

    getInstVal() {
        return this.instRegister;
    }

    setALUFlags(obj = {}) {
        this.ALUFlags = {
            ...this.ALUFlags,
            ...obj
        }
    }
    setInstAddress(val){
        this.instAddrRegister = val;
    }
}