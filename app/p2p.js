import { WebSocketServer } from 'ws'
import dotenv from 'dotenv'
import WebSocket from 'ws'

dotenv.config();
const port  = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2PServer{
    constructor(blockchain) {
        this.blockchain = blockchain;
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
            this.blockchain.replaceChain(data);
        })
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains(){
        this.sockets.forEach((socket) => {
            this.sendChain(socket);
        })
    }
}

export default P2PServer;