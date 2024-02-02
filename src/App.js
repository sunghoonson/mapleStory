// App.js pull
import React from 'react';
import './App.css';
import MyComponent from './component/MyComponent.tsx'; // 임포트
//import Header from './Header';

function App() {
  return (
    <div className="grid-container">
      {/* <div className="header-hover-area"></div> */}
      {/* <Header /> */}
      {[...Array(9)].map((_, index) => (
        <div className={`grid-item grid-item-${index}`} key={index}>
          <div style={{ color: 'white' }}>{index === 4 ? <MyComponent /> : `영역 ${index + 1}`}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
