import React from 'react';
import { createRoot } from 'react-dom';
import App from './App'; // Your main component

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
