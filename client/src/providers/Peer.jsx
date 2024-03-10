import React, { useCallback, useEffect, useMemo, useState } from "react";

const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);


export const PeerProvider = (props) => {
    const [remoteStream, setRemoteStream] = useState(0)
    const peer = useMemo(()=>new RTCPeerConnection({
        iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478"
            ]
        }
    ]
    }), [])
    const createOffer = async () =>{
        // Initaiting the peer connection offer use SDP protocol
        // for the purpose of starting a new WebRTC connection to a remote peer.
        const offer = await peer.createOffer()
        // This description specifies the properties of the local end of the connection, 
        // including the media format.
        await peer.setLocalDescription(offer)
        return offer;
    }

    const creatAnswer = async (offer) => {
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer);
        return answer;
    }
    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans);
    }

    const sendStream = async (stream) => {
        console.log("inside send stream to the remote");
        const tracks = await stream.getTracks()

        for (const track of tracks){
            console.log("track: ", track);
            peer.addTrack(track, stream);
        }
    }
    const handleTrackEvent = useCallback((ev) => {
        console.log("Inside handle track event");
        const streams = ev.streams;
        console.log(streams);
        setRemoteStream(streams[0])
    }, [])
    // const handleNegotiationneeded = useCallback(()=>{
    //     console.log("Negotiation Needed!!!")
    // }, [])
    useEffect(()=>{
        peer.addEventListener('track', handleTrackEvent);
        // peer.addEventListener('negotiationneeded', handleNegotiationneeded)
        return () => {
            peer.removeEventListener('track', handleTrackEvent);
            // peer.removeEventListener('negotiationneeded', handleNegotiationneeded)
        }
    }, [handleTrackEvent, peer])

    return (
        <PeerContext.Provider value={{peer, createOffer, creatAnswer, setRemoteAns, sendStream, remoteStream}}>
            {props.children}
        </PeerContext.Provider>
    )
}