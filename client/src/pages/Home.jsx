import React from 'react';

const HomePage = () =>{
    return (
        <div className='homepage-container'>
            <div>
                <input type="email" placeholder="Enter your email"/>
                <input type="text" placeholder="Enter room id" />
                <button>Enter Room</button>
            </div>
        </div>
    );
}

export default HomePage;