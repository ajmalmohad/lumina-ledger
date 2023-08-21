import { v1 as uuidv1 } from 'uuid';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidv1();
    }
}

export default ChainUtil;