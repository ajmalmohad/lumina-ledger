import MemPool from "./mempool.js";
import Transaction from "./transaction.js";
import Wallet from './../wallet/wallet.js'

describe('MemPool', () => { 
    let mp, wallet, transaction;
    
    beforeEach(()=>{
        mp = new MemPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'random-address', 30);
        mp.updateOrAddTransaction(transaction);
    });

    it('adds a transaction to the pool', () => {
        expect(mp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction to the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'random-person', 40);
        mp.updateOrAddTransaction(newTransaction);
        expect(JSON.stringify(mp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
    });
 })