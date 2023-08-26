import Wallet from "./wallet/wallet.js";
import BlockChain from './blockchain/blockchain.js';
import MemPool from './wallet/mempool.js'

const wallet = new Wallet();
const bc = new BlockChain();
const mp = new MemPool();

wallet.createTransaction('newperson', 30, bc, mp);
wallet.createTransaction('newperson', 30, bc, mp);

bc.addBlock(mp.transactions);