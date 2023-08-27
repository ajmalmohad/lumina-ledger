import Wallet from "./wallet/wallet.js";
import BlockChain from './blockchain/blockchain.js';
import MemPool from './wallet/mempool.js'

const wallet = new Wallet();
const bc = new BlockChain();
const mp = new MemPool();

const start = performance.now();
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);
const end = performance.now();
const elapsed = end - start;
console.log('Elpased: '+elapsed);

bc.addBlock(mp.transactions);