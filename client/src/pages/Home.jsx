import React from 'react';
import { useState, useEffect } from 'react';
import { useSocket } from '../providers/Socket';
import { useNavigate } from 'react-router-dom';

const HomePage = () =>{
    // this is listener from the frontend side
    const {socket} = useSocket()
    // socket.emit('user:joined', {email: "123", RoomId: '1'})
    const [roomId, setRoomId] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const handleRoom = () => {
        socket.emit("user:join", {email, roomId})
        console.log("Inside handleRoom function", roomId, email)
    }
    const handleJoinedRoom = ({roomId, email})=>{
        console.log("room has been joined", roomId, email);
        // navigate to RoomPage compoent
        navigate(`/room/${roomId}`);
    }
    // useMemo is a React Hook that lets you cache the result of a 
    // calculation between re-renders.
    // useMemo(calculateValue, dependencies)
    useEffect(() => {socket.on("user:joined", handleJoinedRoom)}, [socket]);



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