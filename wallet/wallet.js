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

    createTransaction(recipient, amount, memPool){
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
}

export default Wallet