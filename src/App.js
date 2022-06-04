import React from 'react';
import Login from "./components/Login";
import Home from "./components/Home";
import {Routes, Route} from 'react-router-dom';


import './css/bootstrap.min.css';
import './App.css';

function App() {

  return (
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/home/*" element={<Home/>}/>
      </Routes>
  );
}

export default App;
