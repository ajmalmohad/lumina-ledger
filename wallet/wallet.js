export const INITIAL_BALANCE = 500;

class Wallet {
    constructor () {
        this.balance = INITIAL_BALANCE;
        this.keyPair = null;
        this.publicKey = null;
    }

    toString() {
        return `Wallet
        Balance:    ${this.balance}
        Public Key: ${this.publicKey.toString()}
        Key Pair:   ${this.keyPair}
        `;
    }
}

export default Wallet