import BlockChain from "./blockchain.js";
import Block from "./block";

describe('BlockChain', () => { 
    let blockchain, blockchain2;
    
    beforeEach(()=>{
        blockchain = new BlockChain();
        blockchain2 = new BlockChain();
    })


    it("starts with genesis block", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
    })
    
    it("adds a new block", ()=>{
        const data = "newblock";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    })

    it("validates a valid chain", ()=>{
        blockchain2.addBlock('foo');
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    })
})