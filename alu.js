/**
 * ALU有两个单元,
 * 一是算术单元,负责计算机里的所有数字操作
 * 二是逻辑单元,负责计算机里的所有逻辑操作
 * 功能用javascript代替
 */
class ALU{
    constructor(){
        //算术单元
        this.arithmeticUnit = null;
        // 逻辑单元
        this.logicUnit = null;
        //ALU 普遍用的 flags
        this.flags = {
            overflow: false,
            zero: false,
            negative: false,
        }
    }
    compute(operaCode,inputA,inputB){

    }

    getFlags(){
        return {...this.flags}
    }

    add(a,b){
        return a+b;
    }
    sub(a,b){
        let ret = a-b;

        if(ret === 0){
            this.flags.zero = true;
        }else if(ret < 0){
            this.flags.negative = true;
        }

        return a-b
    }

    reset(){
        this.flags = {
            overflow: false,
            zero: false,
            negative: false,
        };
    }
}