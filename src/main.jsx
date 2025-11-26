import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import a global CSS file for Tailwind CSS to function correctly,
// often named index.css or global.css, which includes Tailwind directives.
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);