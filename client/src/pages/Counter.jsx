import React from 'react';
import { useContext } from 'react';
import { CounterContext } from '../providers/Counter';
// import { SocketProvider } from './providers/Socket';

export const CounterPage = () =>{
    console.log("Inside Counter Page")
    const counterState = useContext(CounterContext);
    console.log("counterState", counterState);
    return (
        <div className='counter-container'>
            <div>
                <h1>Counter Value is {counterState.count}</h1>
                <button onClick={() => counterState.setCount(counterState.count+1)}>Increment</button>
                <button onClick={() => counterState.setCount(counterState.count-1)}>Decrement</button>
            </div>
        </div>
    );
}

export default CounterPage;