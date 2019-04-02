export const operaCodes = {
    ADD: '~A',
    SUB: '~S',
    LOAD_A: 'LOAD_A',
    LOAD_B: 'B'
}

export const uint8 = function(){
    return new Uint8Array(1)[0];
};



export default{
    operaCodes,
    uint8
}