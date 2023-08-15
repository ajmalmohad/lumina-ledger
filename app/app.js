import dotenv from 'dotenv'
import express from 'express'
import Blockchain from './../blockchain/blockchain.js'

const port  = process.env.PORT || 3000;
dotenv.config();
const app = express();
const blockchain = new Blockchain();

app.get('/', (req, res) => {
  res.send('Working!')
})

app.get('/blocks', (req, res) => {
    res.send(blockchain.chain)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})