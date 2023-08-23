import Wallet from "./wallet.js";
import MemPool from "./mempool.js";

describe('Wallet', () => { 
    let wallet, mp;

    beforeEach(()=>{
        wallet = new Wallet();
        mp = new MemPool();
    });

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(()=>{
            sendAmount = 50;
            recipient = "random-recipient";
            transaction = wallet.createTransaction(recipient, sendAmount, mp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(()=>{
                wallet.createTransaction(recipient, sendAmount, mp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - sendAmount*2);
            });

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    })
 })