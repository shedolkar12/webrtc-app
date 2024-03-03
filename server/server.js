const express = require("express");
const path = require("path")
const {Server} = require("socket.io")
const {createServer} = require("http")


const app = express()
const port = 3000
const server = createServer(app)
const io = new Server(server)

// app.use(express.static(path.join(__dirname, '..', 'client')));

app.get("/", (req, res)=>{
    console.log(`req: ${req}`)
    console.log(path.join(__dirname, '..', 'client'));
    // res.json({"status": "success"})
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

app.get("/home", (req, res)=>{
    res.json({"status": "success"});
})

io.on('connection', (socket) => {
    console.log("uer connected")
    socket.on('disconnect', ()=>{
        console.log("User disconnected");
    })
})

app.listen(port, () => {
    console.log(`app is listenting as  port ${port}`)
})