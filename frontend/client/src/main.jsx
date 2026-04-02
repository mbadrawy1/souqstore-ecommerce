import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: '#1A1A3E',
                  color: '#E8E8F0',
                  border: '1px solid #2A2A5A',
                  borderRadius: '12px',
                  fontFamily: 'Cairo, sans-serif',
                },
                success: {
                  iconTheme: { primary: '#00D68F', secondary: '#1A1A3E' }
                },
                error: {
                  iconTheme: { primary: '#FF3D71', secondary: '#1A1A3E' }
                }
              }}
            />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
