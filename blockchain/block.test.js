import Block from './block.js'
import { DIFFICULTY } from './block.js';

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

    it("generates a hash that matches the difficulty", ()=>{
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
    })
})