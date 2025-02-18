import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero/Hero';  
import FlightMap from './components/FlightMap/FlightMap';
import Footer from './components/Footer';
import Stats from './components/Stats';
import Carousel from './components/carousel/carousel.slideInterval.tsx'; 
import { Team } from './components/team/Team'; 
import Events from './components/Events/Events';
import FlightsInProgress from './components/FlightProgress/FlightsInProgress';
import ScrollButtons from './components/ScrollButtons/ScrollButtons';
import CookieBanner from './components/Cookie/CookieBanner';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <ScrollButtons />
                    <CookieBanner />
                    <Stats />
                    <FlightMap />
                    <FlightsInProgress />
                    <Team />
                    <Carousel />
                  </>
                } />
                <Route path="/events" element={<Events />} />
                <Route path="/flight-map" element={<FlightMap />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
export default App;
