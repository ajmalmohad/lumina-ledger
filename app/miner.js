class Miner {
    constructor(blockchain, memPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.memPool = memPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.memPool.validTransactions();
        // give reward for miner
        // create block of valid transaction
        // sync chains in p2p server
        // clear mem pool 
        // broadcast to others to clear their mempools
    }
}

export default Miner;