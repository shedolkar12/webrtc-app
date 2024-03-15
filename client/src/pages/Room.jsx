import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";
import ReactPlayer from 'react-player'


function Item({ email }) {
    if (!email) {
        return null;
    }
    return <h1>you are connected with {email}</h1>;
}

const RoomPage = () => {
    const { socket } = useSocket();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState(0)
    // const [roomUsers, setRoomUsers ]= useState([])
    const { peer, createOffer, creatAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();
    const handleNewUserJoined = useCallback(
        async (data) => {
            const { email } = data;
            setRemoteEmailId(email)
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
            const { emailOfA, offerOfA } = data;
            setRemoteEmailId(emailOfA)
            console.log("Incoming call.....", emailOfA, offerOfA);
            const answerOfB = await creatAnswer(offerOfA)
            socket.emit("call-accepted-acknowledgement", { emailOfA, answerOfB })
        }, [creatAnswer, socket]
    )

    const handleCallAccepted = useCallback(async (data) => {
        const { answerOfB } = data;
        console.log("call has been accepted by: ", remoteEmailId, answerOfB);
        await setRemoteAns(answerOfB);
        console.log("post await....");
    }, [setRemoteAns]);

    const handleNegotiationneeded = useCallback(()=>{
        console.log("Negotiation Needed!!!")
        // const offer = await createOffer();
        const localOffer = peer.localDescription;
        console.log("New user joined with email and offer from negotation", remoteEmailId, localOffer)
        socket.emit("call-user-from-A", { emailOfB: remoteEmailId, offerOfA: localOffer });
    
    }, [peer, remoteEmailId, socket])

    useEffect(()=>{
        peer.addEventListener('negotiationneeded', handleNegotiationneeded);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiationneeded)
        }
    }, [handleNegotiationneeded, peer])

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

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        setMyStream(stream);

    }, [])

    useEffect(() => {
        getUserMediaStream()
    }, [getUserMediaStream])
    return (
        <div className="room-page-container">
            
            <section>
                <h1>I am on room Page</h1>
                <Item
                    email={remoteEmailId}
                />
                
            </section>
            {/* <ul>
                <li></li>
            </ul> */}
            <ReactPlayer url={myStream} playing muted />
            <button onClick={(e) => sendStream(myStream)}>Send my Video</button>
            <div>
                <h1>Remote Video</h1>
                <ReactPlayer url={remoteStream} playing muted />
            </div>
        </div>
    );
};

export default RoomPage;
