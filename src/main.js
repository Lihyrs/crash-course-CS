// import {INSTRUCTION} from './common/instruction'
import Raw from './raw'
import cpu from './cpu'

const RAW = new Raw(Math.pow(2, 4));
const CPU = new cpu();

console.log('start')

const dump = [
    0b00101110, //LOAD_A
    0b00011111, //LOAD_B
    0b10000100, //ADD B A
    0b11110000, //HALF
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000011,
    0b00001110,
]

RAW.load([...dump])


CPU.init({
    raw: RAW
});

try {
    CPU.run();
} catch (err) {
    console.error(err)
}