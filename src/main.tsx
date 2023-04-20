import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AuthProvider from './AuthProvider';
import { GlobalStyle } from './shared/globalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
