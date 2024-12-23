import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import supabase from './supabaseClient/supabase';

import Home from './Components/Home/Home';
import CampaignPage from './Components/CampaignCreation/CampaignPage';
import Signup from './Components/Signup/signup';
import DonationForm from './Components/Donation/DonationForm';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import {UserProfile} from './Components/UserProfile/UserProfile';
import CampaignListing from './Components/CampaignListings/CampaignListings';
import CampaignDashboard from './Components/CampaignDashboard/CampaignDashboard';
import CampaignAnalytics from './Components/CampaignAnalytics/CampaignAnalytics';
import TicketApp from './Components/Ticket/TicketApp';
import Footer from './Components/Footer/Footer';
import {SupportPage} from './Components/Support/support';
import AboutUs from './Components/AboutUs/AboutUs';

function App() {
  // const [user, setUser] = useState(null);
  // const [role, setRole] = useState(null);  
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const session = supabase.auth.session();  
  
  //     if (session) {
  //       setUser(session.user); 
  
        
  //       const { data: userRole, error } = await supabase
  //         .from('Users')
  //         .select('role')
  //         .eq('user_id', session.user.id)
  //         .single();
  
  //       if (error) {
  //         console.error("Error fetching user role:", error);
  //       } else {
  //         setRole(userRole.role); // Store the user's role
  //       }
  //     }
  
  //     setLoading(false);
  //   };
  
  //   fetchUser();
  
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (_, session) => {
  //       setUser(session?.user || null); 
  //       if (session?.user) {
  //         fetchUser();
  //       } else {
  //         setRole(null);  
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.remove();  
  //   };
  // }, []);

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();  
  //   setUser(null); 
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/wizard' element={<CampaignPage />} />
          <Route path="/donation" element={<DonationForm />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/listings" element={<CampaignListing />} />
          <Route path="/dashboard" element={<CampaignDashboard />} />
          <Route path="/campaign-analytics" element={<CampaignAnalytics />} />
          <Route path="/settings" element={<CampaignAnalytics />} />
          <Route path="/ticketing" element={<TicketApp />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;




