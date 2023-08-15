import Block from './block.js'

let block = new Block(new Date(), "prevhash", "newhash", "hola");
console.log(Block.genesis().toString())