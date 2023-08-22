import { v1 as uuidv1 } from 'uuid';
import { createHash } from 'node:crypto';
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
    
    static hash(data){
        return createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
    }
}

export default ChainUtil;