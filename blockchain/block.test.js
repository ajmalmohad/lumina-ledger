import Block from './block.js'

describe('Block', () => { 
    let data, lastBlock, block;
    
    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesisBlock();
        block = Block.mineBlock(lastBlock, data);
    })


    it("sets the `data` to match given input", ()=>{
        expect(block.data).toEqual(data);
    })
    
    it("sets the `lastHash` to match hash of last block", ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    })
})