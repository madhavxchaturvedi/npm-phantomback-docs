import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import SearchDialog from './components/SearchDialog';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <ScrollToTop />
        <SearchDialog />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
