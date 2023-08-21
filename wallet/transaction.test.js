import Transaction from "./transaction.js";
import Wallet from "./wallet.js";

describe('Transaction', () => { 
    let transaction, wallet, recipient, amount;
    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'recipient-address';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', ()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to recipient address', ()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    describe('transacting with an amount that exceeds the balance', () => { 
        beforeEach(()=>{
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });
    
        it('does not create transaction', ()=>{
            expect(transaction).toEqual(undefined);
        });
     })
 })