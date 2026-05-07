import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Root of React App
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Router wrapper (IMPORTANT for routes to work) */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);