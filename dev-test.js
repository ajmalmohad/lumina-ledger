import BlockChain from './blockchain/blockchain.js'

let bc = new BlockChain()
console.log(bc.chain[0].toString())

for(let i=0; i<10; i++){
    console.log(bc.addBlock(`foo${i}`).toString())
}