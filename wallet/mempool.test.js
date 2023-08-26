import MemPool from "./mempool.js";
import Wallet from './../wallet/wallet.js'
import BlockChain from "../blockchain/blockchain.js";

describe('MemPool', () => { 
    let mp, wallet, transaction, bc;
    
    beforeEach(()=>{
        mp = new MemPool();
        wallet = new Wallet();
        bc = new BlockChain();
        transaction = wallet.createTransaction('random-address', 30, bc, mp);
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

    it('clears the transactions', () => {
        mp.clear();
        expect(mp.transactions).toEqual([]);
    });

    describe('mixing valid and corrupt transactions', () => { 
         let validTransactions;
         beforeEach(()=>{
            validTransactions = [...mp.transactions];
            for (let i = 0; i < 6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('random-address', 30, bc, mp);
                if(i%2 == 0) transaction.input.amount = 99999;
                else validTransactions.push(transaction);
            }
         });

        it('shows a difference between valid and corrupt transactions', ()=>{
            expect(JSON.stringify(mp.transactions)).not.toEqual(JSON.stringify(validTransactions));
        })

        it('grabs valid transactions', ()=>{
            expect(mp.validTransactions()).toEqual(validTransactions);
        })
    });

 })