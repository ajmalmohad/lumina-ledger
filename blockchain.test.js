import BlockChain from "./blockchain.js";
import Block from "./block";

describe('Block', () => { 
    let blockchain;
    
    beforeEach(()=>{
        blockchain = new BlockChain();
    })


    it("starts with genesis block", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
    })
    
    it("adds a new block", ()=>{
        const data = "newblock";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    })
})