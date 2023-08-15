import { createHash } from 'node:crypto'

export const DIFFICULTY = 4;

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash}
        Hash:      ${this.hash}
        Nonce:     ${this.nonce}
        Data:      ${this.data}
        `;
    }

    static genesisBlock() {
        const timestamp = new Date('January 1, 1000 00:00:00');
        const lastHash = null;
        const data = [];
        const nonce = 7110;
        const hash = Block.hash(timestamp, lastHash, data, nonce);
 
        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;
        let hash, timestamp;

        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
        }while(hash.substring(0, DIFFICULTY) != '0'.repeat(DIFFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce){
        return createHash('sha256').update(`${timestamp}${lastHash}${data}${nonce}`).digest('hex')
    }

    static blockHash(block){
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}

export default Block;