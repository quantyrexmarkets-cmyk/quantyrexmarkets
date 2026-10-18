import React from 'react';
import MarketOverview from './components/MarketOverview.jsx';
import Achievements from './components/Achievements.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import ContactUs from './components/ContactUs.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import LanguageTranslator from './components/LanguageTranslator.jsx';

class ComponentBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('Isolated error caught in ' + this.props.name + ':', error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500 selection:text-white font-sans antialiased">
        <ComponentBoundary name="MarketOverview"><MarketOverview /></ComponentBoundary>
        <ComponentBoundary name="Achievements"><Achievements /></ComponentBoundary>
        <ComponentBoundary name="HowItWorks"><HowItWorks /></ComponentBoundary>
        <ComponentBoundary name="ContactUs"><ContactUs /></ComponentBoundary>
        <ComponentBoundary name="FAQ"><FAQ /></ComponentBoundary>
        <ComponentBoundary name="Footer"><Footer /></ComponentBoundary>
        <ComponentBoundary name="LanguageTranslator"><LanguageTranslator /></ComponentBoundary>
    </div>
  );
}

export default App;
