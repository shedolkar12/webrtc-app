const express = require("express");
const {Server} = require("socket.io")
const http = require("http")
const path = require("path")

app = express()
port = 3001
const server = http.createServer(app);
const io = new Server(server, {
    cors: true
});

const EmailRoomSocketMapping = new Map()

app.get("/", (req, res)=>{
    console.log("request path ", req.path);
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))
})

io.on("connection", socket => {
    console.log(`user connected:  ${socket.id}`);

    socket.on("user:join", data => {
        const {email, roomId} = data;
        EmailRoomSocketMapping.set(email, roomId);
        console.log(`User Join the room email: ${email}, RoomId: ${roomId}`);
        socket.join(roomId);
        socket.emit("user:joined", {roomId, email});
        socket.broadcast.to(roomId).emit("Room:user:joined", {email});
    })

    socket.on("disconnect", ()=>{
        console.log(`user disconnected: ${socket.id}`);
        // users.delete(socket.id);
        socket.emit("user:disconnect", socket.id);
    })
});


server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);

})