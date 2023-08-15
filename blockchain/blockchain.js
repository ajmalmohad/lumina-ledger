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

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())){
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash !== lastBlock.hash) return false;
            if(block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }

    replaceChain(chain){
        if(chain.length <= this.chain.length) {
            console.log("Recieved Chain is not longer than current chain");
        }else if(!this.isValidChain(chain)){
            console.log("Recieved Chain is not valid");
        }else{
            console.log("Replacing blockchain with new chain");
            this.chain = chain;
        }
    }
}

export default BlockChain;