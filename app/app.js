import dotenv from 'dotenv'
import express from 'express'
import Blockchain from './../blockchain/blockchain.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`)
})