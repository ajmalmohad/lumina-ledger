import Transaction from "../wallet/transaction.js";
import Wallet from "../wallet/wallet.js";

export const MINING_REWARD = 50;

class Miner {
    constructor(blockchain, memPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.memPool = memPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.memPool.validTransactions();
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockChainWallet()))
        const block = this.blockchain.addBlock(validTransactions);
        this.p2pServer.syncChains();
        this.memPool.clear();
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

export default Miner;