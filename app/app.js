import dotenv from 'dotenv'
import express from 'express'
import Blockchain from './../blockchain/blockchain.js'

const port  = process.env.PORT || 3000;
dotenv.config();
const app = express();
app.use(express.json());
const blockchain = new Blockchain();

app.get('/', (req, res) => {
  res.send('Working!');
})

app.get('/blocks', (req, res) => {
    res.send(blockchain.chain);
})

app.post('/mine', (req, res) => {
  let data = req.body.data;
  if(!data) res.status(404).send({"error": "Data not recieved"});
  else{
    blockchain.addBlock(data);
    res.status(200).send(blockchain.chain);
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})