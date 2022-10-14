import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import Student from './components/Student';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={`/update/:id`} element={<Update />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
