import dotenv from 'dotenv'
import express from 'express'
import Blockchain from './../blockchain/blockchain.js'
import P2PServer from './p2p.js'
import Wallet from './../wallet/wallet.js'
import MemPool from './../wallet/mempool.js'
import Miner from './miner.js'

dotenv.config();
const port  = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const blockchain = new Blockchain();
const wallet = new Wallet();
const mempool = new MemPool();
const p2pServer = new P2PServer(blockchain, mempool);
const miner = new Miner(blockchain, mempool, wallet, p2pServer);

app.get('/', (req, res) => {
  res.status(200).send('Working!');
})

app.get('/blocks', (req, res) => {
  res.status(200).send(blockchain.chain);
})

app.get('/transactions', (req, res) => {
  res.status(200).send(mempool.transactions);
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  if(!recipient || !amount) res.status(404).send({"error": "Data not recieved"});
  else {
    const transaction = wallet.createTransaction(recipient, amount, mempool);
    p2pServer.broadcastTransaction(transaction);
    res.status(200).send(mempool.transactions);
  }
})

app.post('/mine', (req, res) => {
  let { data } = req.body;
  if(!data) res.status(404).send({"error": "Data not recieved"});
  else{
    blockchain.addBlock(data);
    p2pServer.syncChains();
    res.status(200).send(blockchain.chain);
  }
})

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.status(200).send(blockchain.chain);
})

app.get('/public-key', (req, res) => {
  res.status(200).send({publicKey: wallet.publicKey})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

p2pServer.listen();