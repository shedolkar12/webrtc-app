import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const RoomPage = () => {
    const { socket } = useSocket();
    // const [roomUsers, setRoomUsers ]= useState([])
    const { createOffer, creatAnswer, setRemoteAns } = usePeer();
    const handleNewUserJoined = useCallback(
        async (data) => {
            const { email } = data;
            console.log("New user joined", email);
            const offer = await createOffer();
            console.log("New user joined with email and offer", email, offer)
            socket.emit("call-user-from-A", { emailOfB: email, offerOfA: offer });
        },
        [createOffer, socket]
    );
    
    const handleIncomingCall = useCallback(
        async (data) => {
            console.log("Inside Incoming Call function")
            const {emailOfA, offerOfA} = data;
            console.log("Incoming call.....", emailOfA, offerOfA);
            const answerOfB = await creatAnswer(offerOfA)
            socket.emit("call-accepted-acknowledgement", {emailOfA, answerOfB})
        }, [creatAnswer, socket]
    )

    const handleCallAccepted = useCallback(async (data)=>{
        const {answerOfB} = data;
        console.log("call has been accepted by: ", answerOfB);
        await setRemoteAns(answerOfB);
    }, [setRemoteAns]);

    useEffect(() => {
        socket.on("Room:user:joined", handleNewUserJoined);
        socket.on("incoming-call-from-A", handleIncomingCall);
        socket.on("call-accepted-by-B", handleCallAccepted);
        return () => {
            socket.off("Room:user:joined", handleNewUserJoined);
            socket.off("incoming-call-from-A", handleIncomingCall);
            socket.off("call-accepted-by-B", handleCallAccepted);
        }
    }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);
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
