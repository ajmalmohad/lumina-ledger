import { WebSocketServer } from 'ws'
import dotenv from 'dotenv'
import WebSocket from 'ws'

dotenv.config();
const port  = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

const MESSAGE_TYPES = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
}

class P2PServer{
    constructor(blockchain, memPool) {
        this.blockchain = blockchain;
        this.memPool = memPool;
        this.sockets = [];
    }

    listen(){
        const server = new WebSocketServer({ port: port });
        server.on('connection', socket => this.connectSocket(socket));
        
        this.connectToPeers();

        console.log(`Listening to peer-to-peer connections on: ${port}`);
    }

    connectToPeers() {
        peers.forEach((peer)=>{
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket Connected");
        
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    messageHandler(socket){
        socket.on('message', (message)=>{
            const data = JSON.parse(message);
            switch(data.type){
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.memPool.updateOrAddTransaction(data.transaction);
                    break;
                default:
                    break;
            }
        })
    }

    sendChain(socket){
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain, 
            chain: this.blockchain.chain
        }));
    }

    sendTransaction(socket, transaction){
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction, 
            transaction: transaction
        }));
    }

    syncChains(){
        this.sockets.forEach((socket) => {
            this.sendChain(socket);
        })
    }

    broadcastTransaction(transaction) {
        this.sockets.forEach((socket) => {
            this.sendTransaction(socket, transaction);
        })
    }
}

export default P2PServer;