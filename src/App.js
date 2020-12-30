import React from 'react';
import './App.css'
import Yo from './yo.jpeg'
function App() {
  return (
    <div className="App">
      <h1 className='title'>단원증</h1>
      <h2>Y&C 임신부</h2>
      <img width="250px" src={Yo} alt="profile"/>
      <h5>소속:본사</h5>
      <h1>구 예 지</h1>
      <span>YE JI GOO</span>
    </div>
  );
}

export default App;
