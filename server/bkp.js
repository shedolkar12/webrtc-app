const express = require("express")
const path = require('path')
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);


const users = new Map();

io.on("connection", (socket)=>{
    console.log(`${socket.id} is connected`);
    users.set(socket.id, socket.id)
    // socket.on("connect", (socket)=>{
    socket.broadcast.emit("users:joined", socket.id)
    socket.emit('hello', {id: socket.id});
    
    socket.on("outgoing:call", data => {
        console.log("data: ");
        const {fromOffer, to} = data;
        console.log("fromOffer, to", fromOffer, to, "socket_id: outgoing:call", socket.id);
        socket.to(to).emit('incoming:call', { from: socket.id, offer: fromOffer });

    })

    socket.on("call:accepted", data => {
        console.log("call:accepted: ", data);
        const {answer, to} = data
        socket.to(to).emit('incoming:answer', {
            from: socket.id,
            offer: answer
        });
    });

    socket.on("disconnect", ()=>{
        console.log(`user disconnected: ${socket.id}`);
        users.delete(socket.id);
        socket.emit("user:disconnect", socket.id);
    })

    // })
})

app.get("/", (req, res)=>{
    console.log(`GET ${path.join(__dirname)}`);
    // res.send("Hello")
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/users', (req, res) => {
    return res.json(Array.from(users));
});

server.listen(port, ()=>{
    console.log(`Server is listening at localhost:3000`);
})