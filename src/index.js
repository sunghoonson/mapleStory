// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store.ts';
import './index.css';

const root = document.getElementById('root');
const rootElement = (
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

const rootContainer = ReactDOM.createRoot(root); // No change needed here
rootContainer.render(rootElement);



