import Block from './block.js'

const genesisBlock = Block.genesisBlock();
const firstBlock = Block.mineBlock(genesisBlock, "firstblock");
console.log(firstBlock.toString());