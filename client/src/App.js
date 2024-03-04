import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/Home' 
function App() {
  return (
    <BrowserRouter>
    <div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<h1>Hello World2</h1>} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
