import ChainUtil from "../chain-util.js";

export const DIFFICULTY = 3;
export const MINE_RATE = 3000;

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block
        Timestamp:  ${this.timestamp}
        Last Hash:  ${this.lastHash}
        Hash:       ${this.hash}
        Nonce:      ${this.nonce}
        Difficulty: ${this.difficulty}
        Data:       ${this.data}
        `;
    }

    static genesisBlock() {
        const lastHash = null;
        const data = [];
        const timestamp = new Date("01-01-01");
        const nonce = 2642;
        const hash = Block.hash(timestamp, lastHash, data, nonce, DIFFICULTY);
        return new this(timestamp, lastHash, hash, data, nonce, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;

        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        }while(hash.substring(0, difficulty) != '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
    }

    static blockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

export default Block;