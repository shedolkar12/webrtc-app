import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const RoomPage = () => {
    const { socket } = useSocket();
    // const [roomUsers, setRoomUsers ]= useState([])
    const { createOffer } = usePeer();
    const handleNewUserJoined = useCallback(
        async (data) => {
            const { email } = data;
            console.log("New user joined", email);
            const offer = await createOffer();
            socket.emit("call-user", { email, offer });
        },
        [createOffer, socket]
    );
    
    const handleIncomingCall = useCallback(
        async (data) => {
            console.log("Inside Incoming data")
            const {from, offer} = data;
            console.log("Incoming call.....", from, offer);
        }, []
    )

    useEffect(() => {
        socket.on("Room:user:joined", handleNewUserJoined);
        socket.on("incoming-call", handleIncomingCall);
    }, [handleNewUserJoined, handleIncomingCall, socket]);
    return (
        <div className="room-page-container">
            I am on room Page
            <ul>
                <li></li>
            </ul>
        </div>
    );
};

export default RoomPage;
