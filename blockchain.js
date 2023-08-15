import Block from './block.js'

class BlockChain {
    constructor() {
        const genesis = Block.genesisBlock();
        this.chain = [genesis];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }
}

export default BlockChain;