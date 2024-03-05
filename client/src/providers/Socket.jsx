import React from 'react';
import { createContext, useMemo } from 'react';
import {io} from 'socket.io-client'

export const SocketContext = createContext(null);

// export const SocketProvider = (props) => {
//     console.log("Inside Socket Provider", props);
//     const [count, setCount] = useState(5); 
//     console.log("Intial Count: ", count);
//     return (
//         <SocketContext.Provider value={{count, setCount }}>
//             {props.children}
//         </SocketContext.Provider>
//     );
// }

export const SocketProvider = (props) => {
    const socket = useMemo(() => io({
        host: 'localhost',
        port: 3001
    }));
    return (
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}

