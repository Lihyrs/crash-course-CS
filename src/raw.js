class Raw {
    constructor(size) {
        this.mm = new Uint8Array(size)
    }

    get(address) {
        return this.mm[address]
    }
    set(address, val) {
        this.mm[address] = val;
    }

    load(dump) {
        for (let i = 0; i < dump.length; i++) {
            this.mm[i] = dump[i]
        }
    }
}

export default Raw;