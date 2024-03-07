import React, { useState } from "react";
import { useEffect } from "react";
import { useSocket } from "../providers/Socket";


const RoomPage = () => {
    const {socket} = useSocket();
    const [roomUsers, setRoomUsers ]= useState([])
    const handleNewUserJoined = (data) => {
        const {email} = data;
        console.log("New user joined", email);
    }
    console.log("Before use Effective")
    useEffect(() => { socket.on("Room:user:joined", handleNewUserJoined) }, [socket]);
    return (
        <div className="room-page-container">I am on room Page
            <ul>
                <li>

                </li>
            </ul>
        </div>
    );
}

export default RoomPage;