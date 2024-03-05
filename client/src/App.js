import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/Home';
import CounterPage from './pages/Counter';
import { SocketProvider } from './providers/Socket';
import { SocketContext } from './providers/Socket';
function App() {
  console.log("Socket Context:", SocketContext);
  return (
    <BrowserRouter>
    <div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/count" element={
            <div>
            <SocketProvider>
              <CounterPage />
            </SocketProvider>
            </div>
          }/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
