const express = require("express");
const {Server} = require("socket.io")
const http = require("http")
const path = require("path")

app = express()
port = 3001
const server = http.createServer(app);
const io = new Server(server);

const EmailRoomSocketMapping = new Map()

app.get("/", (req, res)=>{
    console.log("request path ", req.path);
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))
})

io.on("connection", socket => {
    console.log(`user connected ${socket.id}`);

    io.on("user:joined", data => {
        const {email, RoomId} = data;
        EmailRoomSocketMapping.set(email, RoomId);
        console.log(`email: ${email}, RoomId: ${RoomId}`);
        io.join(RoomId)
        io.broadcast.to(RoomId).emit("Room:user:joined", {email})
    })

    socket.on("disconnect", ()=>{
        console.log(`user disconnected: ${socket.id}`);
        users.delete(socket.id);
        socket.emit("user:disconnect", socket.id);
    })
});


server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);

})