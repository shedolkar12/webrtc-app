import React, { useMemo } from "react";

const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);


export const PeerProvider = (props) => {
    
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

    return (
        <PeerContext.Provider value={{peer, createOffer, creatAnswer, setRemoteAns}}>
            {props.children}
        </PeerContext.Provider>
    )
}