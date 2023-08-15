import { createHash } from 'node:crypto'

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash}
        Hash:      ${this.hash}
        Data:      ${this.data}
        `;
    }

    static genesisBlock() {
        const timestamp = new Date('January 1, 1000 00:00:00');
        const lastHash = null;
        const data = [];
        const hash = Block.hash(timestamp, lastHash, data)
        return new this(timestamp, lastHash, hash, data);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data){
        return createHash('sha256').update(`${timestamp}${lastHash}${data}`).digest('hex')
    }

    static blockHash(block){
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
}

export default Block;