import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import supabase from './supabaseClient/supabase';

import Home from './Components/Home/Home';
import CampaignPage from './Components/CampaignCreation/CampaignPage';
import Signup from './Components/Signup/signup';
import DonationForm from './Components/Donation/DonationForm';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { UserProfile } from './Components/UserProfile/UserProfile';
import CampaignListing from './Components/CampaignListings/CampaignListings';
import CampaignDashboard from './Components/CampaignDashboard/CampaignDashboard';
import CampaignAnalytics from './Components/CampaignAnalytics/CampaignAnalytics';
import TicketApp from './Components/Ticket/TicketApp';
import Footer from './Components/Footer/Footer';
import { SupportPage } from './Components/Support/support';
import AboutUs from './Components/AboutUs/AboutUs';
import AdminPanel from './Components/AdminPannel/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation(); // Hook used inside the Router context

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wizard" element={<CampaignPage />} />
        <Route path="/donation" element={<DonationForm />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/listings" element={<CampaignListing />} />
        <Route path="/dashboard" element={<CampaignDashboard />} />
        <Route path="/campaign-analytics" element={<CampaignAnalytics />} />
        <Route path="/settings" element={<CampaignAnalytics />} />
        <Route path="/ticketing" element={<TicketApp />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {location.pathname !== '/admin' && <Footer />}
    </>
  );
}

export default App;
