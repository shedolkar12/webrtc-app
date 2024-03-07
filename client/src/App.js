import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/Home';
import RoomPage from './pages/Room';
import CounterPage from './pages/Counter';
import { SocketProvider } from './providers/Socket';
// import { SocketContext } from './providers/Socket';
import {CounterContextProvider} from './providers/Counter';
import {PeerProvider} from './providers/Peer';

function App() {
  // console.log("Socket Context:", SocketContext);
  return (
    <BrowserRouter>
    <div>
      <div>
      <SocketProvider>
        <PeerProvider>
        <Routes>
          
          <Route path="/" element={<HomePage/>} />
          <Route path="/room/:roomId" element={<RoomPage/>} />
          <Route path="/count" element={
            <div>
            <CounterContextProvider>
              <CounterPage />
            </CounterContextProvider>
            </div>
          }/>
        </Routes>
        </PeerProvider>
        </SocketProvider>

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
