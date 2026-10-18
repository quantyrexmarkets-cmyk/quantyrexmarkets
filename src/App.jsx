import React from 'react';
import AIAssistant from './components/AIAssistant.jsx';
import AIChatView from './components/AIChatView.jsx';
import Achievements from './components/Achievements.jsx';
import BTCChart from './components/BTCChart.jsx';
import ChatButton from './components/ChatButton.jsx';
import ContactUs from './components/ContactUs.jsx';
import CryptoMarketOverview from './components/CryptoMarketOverview.jsx';
import CryptoNews from './components/CryptoNews.jsx';
import DashboardSidebar from './components/DashboardSidebar.jsx';
import DashboardTicker from './components/DashboardTicker.jsx';
import FAQ from './components/FAQ.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import Footer from './components/Footer.jsx';
import ForexTicker from './components/ForexTicker.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import InlineLoader from './components/InlineLoader.jsx';
import InvestmentOpportunities from './components/InvestmentOpportunities.jsx';
import LanguageTranslator from './components/LanguageTranslator.jsx';
import LiveChat from './components/LiveChat.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import MarketOverview from './components/MarketOverview.jsx';
import MarketTicker from './components/MarketTicker.jsx';
import NetworkBackground from './components/NetworkBackground.jsx';
import NotificationBell from './components/NotificationBell.jsx';
import OurMission from './components/OurMission.jsx';
import OurPlans from './components/OurPlans.jsx';
import PageHeader from './components/PageHeader.jsx';
import ParticleNetwork from './components/ParticleNetwork.jsx';
import PartnersMarquee from './components/PartnersMarquee.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Smartsupp from './components/Smartsupp.jsx';
import StatusPopup from './components/StatusPopup.jsx';
import Testimonials from './components/Testimonials.jsx';
import TradingAnalysis from './components/TradingAnalysis.jsx';
import VideoResources from './components/VideoResources.jsx';
import WhyChooseSection from './components/WhyChooseSection.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';

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
    if (this.state.hasError) {
      return null; // Silently swallow error for this component while keeping rest of site intact
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500 selection:text-white font-sans antialiased">
        <ComponentBoundary name="AIAssistant"><AIAssistant /></ComponentBoundary>
        <ComponentBoundary name="AIChatView"><AIChatView /></ComponentBoundary>
        <ComponentBoundary name="Achievements"><Achievements /></ComponentBoundary>
        <ComponentBoundary name="BTCChart"><BTCChart /></ComponentBoundary>
        <ComponentBoundary name="ChatButton"><ChatButton /></ComponentBoundary>
        <ComponentBoundary name="ContactUs"><ContactUs /></ComponentBoundary>
        <ComponentBoundary name="CryptoMarketOverview"><CryptoMarketOverview /></ComponentBoundary>
        <ComponentBoundary name="CryptoNews"><CryptoNews /></ComponentBoundary>
        <ComponentBoundary name="DashboardSidebar"><DashboardSidebar /></ComponentBoundary>
        <ComponentBoundary name="DashboardTicker"><DashboardTicker /></ComponentBoundary>
        <ComponentBoundary name="FAQ"><FAQ /></ComponentBoundary>
        <ComponentBoundary name="FloatingChat"><FloatingChat /></ComponentBoundary>
        <ComponentBoundary name="Footer"><Footer /></ComponentBoundary>
        <ComponentBoundary name="ForexTicker"><ForexTicker /></ComponentBoundary>
        <ComponentBoundary name="HeroSection"><HeroSection /></ComponentBoundary>
        <ComponentBoundary name="HowItWorks"><HowItWorks /></ComponentBoundary>
        <ComponentBoundary name="InlineLoader"><InlineLoader /></ComponentBoundary>
        <ComponentBoundary name="InvestmentOpportunities"><InvestmentOpportunities /></ComponentBoundary>
        <ComponentBoundary name="LanguageTranslator"><LanguageTranslator /></ComponentBoundary>
        <ComponentBoundary name="LiveChat"><LiveChat /></ComponentBoundary>
        <ComponentBoundary name="LoadingScreen"><LoadingScreen /></ComponentBoundary>
        <ComponentBoundary name="LoadingSpinner"><LoadingSpinner /></ComponentBoundary>
        <ComponentBoundary name="MarketOverview"><MarketOverview /></ComponentBoundary>
        <ComponentBoundary name="MarketTicker"><MarketTicker /></ComponentBoundary>
        <ComponentBoundary name="NetworkBackground"><NetworkBackground /></ComponentBoundary>
        <ComponentBoundary name="NotificationBell"><NotificationBell /></ComponentBoundary>
        <ComponentBoundary name="OurMission"><OurMission /></ComponentBoundary>
        <ComponentBoundary name="OurPlans"><OurPlans /></ComponentBoundary>
        <ComponentBoundary name="PageHeader"><PageHeader /></ComponentBoundary>
        <ComponentBoundary name="ParticleNetwork"><ParticleNetwork /></ComponentBoundary>
        <ComponentBoundary name="PartnersMarquee"><PartnersMarquee /></ComponentBoundary>
        <ComponentBoundary name="ScrollToTop"><ScrollToTop /></ComponentBoundary>
        <ComponentBoundary name="SignIn"><SignIn /></ComponentBoundary>
        <ComponentBoundary name="SignUp"><SignUp /></ComponentBoundary>
        <ComponentBoundary name="Smartsupp"><Smartsupp /></ComponentBoundary>
        <ComponentBoundary name="StatusPopup"><StatusPopup /></ComponentBoundary>
        <ComponentBoundary name="Testimonials"><Testimonials /></ComponentBoundary>
        <ComponentBoundary name="TradingAnalysis"><TradingAnalysis /></ComponentBoundary>
        <ComponentBoundary name="VideoResources"><VideoResources /></ComponentBoundary>
        <ComponentBoundary name="WhyChooseSection"><WhyChooseSection /></ComponentBoundary>
        <ComponentBoundary name="WhyChooseUs"><WhyChooseUs /></ComponentBoundary>
    </div>
  );
}

export default App;
