import React from 'react';
import { useState } from 'react';
import { useSocket } from '../providers/Socket';

const HomePage = () =>{
    const {socket} = useSocket()
    // socket.emit('user:joined', {email: "123", RoomId: '1'})
    const [roomId, setRoomId] = useState()
    const [email, setEmail] = useState()
    const handleRoom = () =>{
        socket.emit("user:joined", {email, roomId})
        console.log("Inside handleRoom function", roomId, email)
    }
    return (
        <div className='homepage-container'>
            <div>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email"/>
                <input value={roomId} onChange={e => setRoomId(e.target.value)} type="text" placeholder="Enter room id" />
                <button onClick={handleRoom}>Enter Room</button>
            </div>
        </div>
    );
}


export default HomePage;