class Raw{
    constructor(size){
        this.mm = new Uint8Array(size)
    }

    get(address){
        return this.mm[address]
    }
    set(address,val){
        this.mm[address] = val;
    }
}