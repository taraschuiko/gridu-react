import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Authentication from './contexts/Authentication';
import './App.css';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <div className="App">
      <Authentication.Provider>
        <Routing />
      </Authentication.Provider>
    </div>
  );
}

export default App;
