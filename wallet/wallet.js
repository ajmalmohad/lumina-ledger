import ChainUtil from "../chain-util.js";
import Transaction from './transaction.js'

export const INITIAL_BALANCE = 500;

class Wallet {
    constructor () {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet
        Balance:    ${this.balance}
        Public Key: ${this.publicKey.toString()}
        `;
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, blockchain, memPool){
        this.balance = this.calculateBalance(blockchain);

        if (amount > this.balance){
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = memPool.existingTransaction(this.publicKey);
        if(transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            memPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    calculateBalance(blockchain) {
        let balance = this.balance;
        let transactions = [];
        blockchain.chain.forEach(block => {
            block.data.forEach(transaction => {
                transactions.push(transaction);
            });
        });

        const walletInputs = transactions.filter((transaction) => {
            transaction.input.address === this.publicKey
        });

        let startTime = 0;
        if(walletInputs.length > 0){
            const recentInput = walletInputs.reduce((prev, current) => {
                prev.input.timestamp > current.input.timestamp ? prev : current
            });

            balance = recentInput.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInput.input.timestamp;
        }
         
        transactions.forEach(transaction => {
            if(transaction.input.timestamp > startTime){
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey) {
                        balance += output.amount;
                    }
                })
            }
        });

        return balance;
    }

    static blockChainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}

export default Wallet