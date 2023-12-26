import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VoteSessionContextProvider } from './context/VoteSessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VoteSessionContextProvider>
      <App />
    </VoteSessionContextProvider>
  </React.StrictMode>
);