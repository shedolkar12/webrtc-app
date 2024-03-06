import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/Home';
import CounterPage from './pages/Counter';
import { SocketProvider } from './providers/Socket';
// import { SocketContext } from './providers/Socket';
import {CounterContextProvider} from './providers/Counter';
function App() {
  // console.log("Socket Context:", SocketContext);
  return (
    <BrowserRouter>
    <div>
      <div>
      <SocketProvider>
        <Routes>
          
          <Route path="/" element={<HomePage/>} />
          <Route path="/count" element={
            <div>
            <CounterContextProvider>
              <CounterPage />
            </CounterContextProvider>
            </div>
          }/>
        </Routes>
        </SocketProvider>

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
