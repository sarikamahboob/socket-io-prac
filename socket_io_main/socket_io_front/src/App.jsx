import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
