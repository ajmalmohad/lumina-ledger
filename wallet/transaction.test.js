import Transaction from "./transaction.js";
import Wallet from "./wallet.js";

describe('Transaction', () => { 
    let transactions, wallet, recipient, amount;
    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'recipient-address';
        transactions = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', ()=>{
        expect(transactions.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to recipient address', ()=>{
        expect(transactions.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });
 })