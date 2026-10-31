import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.js';
import Nav from './components/layout/Nav.js';
import Footer from './components/layout/Footer.js';

import ContactoPage from './pages/ContactoPage.js';
import HomePage from './pages/HomePage.js';
import LocalesPage from './pages/LocalesPage.js';
import HistoriaPage from './pages/HistoriaPage.js';
import HospedajesPage from './pages/HospedajesPage.js';
import MenuPage from './pages/MenuPage.js';
import HospedajeDetallePage from './pages/HospedajeDetallePage.js';

function App() {
    return (
        <div className='App'>
            <Header />

            <BrowserRouter>
             <Nav />
             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/locales" element={<LocalesPage />} />
                <Route path="/hospedajes" element={<HospedajesPage />} />
                <Route path="/historia" element={<HistoriaPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/menu/:slug" element={<MenuPage />} />
                <Route path="/hospedajes/:slug" element={<HospedajeDetallePage />} />
             </Routes>
            </BrowserRouter>

            <Footer />
        </div>
    );
}

export default App;