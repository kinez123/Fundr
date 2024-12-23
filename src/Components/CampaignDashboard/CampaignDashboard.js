import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient/supabase';
import Sidebar from './Sidebar';
import Navbar from '../Navbar/Navbar';

const CampaignDashboard = () => {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .single(); 
        if (error) throw error;
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch user's campaigns
  useEffect(() => {
    if (user) {
      const fetchCampaignsAndDonations = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data: campaignsData, error: campaignsError } = await supabase
            .from('Campaigns')
            .select('*')
            .eq('creator_id', user.user_id); 
          if (campaignsError) throw campaignsError;

          const { data: donationsData, error: donationsError } = await supabase
            .from('Donations')
            .select('campaign_id, amount');
          if (donationsError) throw donationsError;

          const campaignsWithDonations = campaignsData.map((campaign) => {
            const campaignDonations = donationsData.filter(
              (donation) => donation.campaign_id === campaign.campaign_id
            );
            const totalDonations = campaignDonations.reduce(
              (sum, donation) => sum + donation.amount,
              0
            );
            return { ...campaign, totalDonations };
          });

          setCampaigns(campaignsWithDonations);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCampaignsAndDonations();
    }
  }, [user]);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) {
      return 'Expired';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Navbar/>
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Campaign Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading campaigns...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            {user && (
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  User Profile
                </h2>
                <p className="text-gray-600 mb-2">Name: {user.name}</p>
                <p className="text-gray-600 mb-2">Email: {user.email}</p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                  Your Campaigns
                </h3>
                {campaigns.length > 0 ? (
                  <div className="grid grid-cols-2 gap-6">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.campaign_id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <img
                          src={
                            campaign.banner_image ||
                            'https://via.placeholder.com/350x200'
                          }
                          alt={campaign.title || 'Campaign'}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                          <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            {campaign.title || 'Untitled Campaign'}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {campaign.description || 'No description available.'}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-4 mt-4 relative">
                            <div
                              className="bg-green-500 h-4 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (campaign.totalDonations /
                                    campaign.goal_amount) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                            <span className="absolute inset-0 flex justify-center items-center text-xs text-white font-semibold">
                              {Math.min(
                                (
                                  (campaign.totalDonations /
                                    campaign.goal_amount) *
                                  100
                                ).toFixed(2),
                                100
                              )}
                              % Raised
                            </span>
                          </div>
                          <p className="text-red-600 text-sm mt-2">
                            Deadline: {calculateTimeLeft(campaign.end_date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No campaigns found.</p>
                )}
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default CampaignDashboard;
