import React from 'react';
import { createContext, useState } from 'react';
// import {io} from 'socket.io-client'

export const SocketContext = createContext(null);

export const SocketProvider = (props) => {
    console.log("Inside Socket Provider", props);
    const [count, setCount] = useState(5); 
    console.log("Intial Count: ", count);
    return (
        <SocketContext.Provider value={{count, setCount }}>
            {props.children}
        </SocketContext.Provider>
    );
}

