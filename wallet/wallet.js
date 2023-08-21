import ChainUtil from "../chain-util.js";

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
}

export default Wallet