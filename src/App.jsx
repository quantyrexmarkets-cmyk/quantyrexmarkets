import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketOverview from './components/MarketOverview';
import Plans from './components/Plans';
import CopyTrading from './components/CopyTrading';
import HowItWorks from './components/HowItWorks';
import SecurityPolicy from './components/SecurityPolicy';
import Footer from './components/Footer';
import LanguageTranslator from './components/LanguageTranslator';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500 selection:text-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <MarketOverview />
        <Plans />
        <CopyTrading />
        <HowItWorks />
        <SecurityPolicy />
      </main>
      <Footer />
      <LanguageTranslator />
    </div>
  );
}

export default App;
