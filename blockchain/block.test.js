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

    it("generates a hash that matches the difficulty", ()=>{
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    })

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
    });

    it('raises the difficulty for quickly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
    });
})