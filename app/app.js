import dotenv from 'dotenv'
import express from 'express'
import Blockchain from './../blockchain/blockchain.js'
import P2PServer from './p2p.js'
import Wallet from './../wallet/wallet.js'
import MemPool from './../wallet/mempool.js'

dotenv.config();
const port  = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const blockchain = new Blockchain();
const wallet = new Wallet();
const mempool = new MemPool();
const p2pServer = new P2PServer(blockchain);

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
    wallet.createTransaction(recipient, amount, mempool);
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

p2pServer.listen();