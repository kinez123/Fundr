import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import supabase from "../../supabaseClient/supabase";
import Modal from "react-modal";

const CampaignListing = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCampaignsAndDonations = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: campaignsData, error: campaignsError } = await supabase
          .from("Campaigns")
          .select("*");
        if (campaignsError) throw campaignsError;

        const { data: donationsData, error: donationsError } = await supabase
          .from("Donations")
          .select("campaign_id, amount");
        if (donationsError) throw donationsError;

        const campaignsWithDonations = campaignsData.map((campaign) => {
          const campaignDonations = donationsData.filter(
            (donation) => donation.campaign_id === campaign.campaign_id
          );
          const totalDonations = campaignDonations.reduce(
            (sum, donation) => sum + donation.amount,
            0
          );
          return { ...campaign, donations: campaignDonations, totalDonations };
        });

        setCampaigns(campaignsWithDonations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignsAndDonations();
  }, []);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) {
      return "Expired";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-10 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-12 text-white m-20">
        Ongoing Campaigns
      </h1>

      {loading && <p className="text-center text-white">Loading campaigns...</p>}
      {error && (
        <p className="text-center text-red-500">Error loading campaigns: {error}</p>
      )}

      <div className="grid grid-cols-3 gap-8">
        {!loading &&
          !error &&
          campaigns.map((campaign) => (
            <div
              key={campaign.campaign_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={campaign.banner_image || "https://via.placeholder.com/350x200"}
                alt={campaign.title || "Campaign"}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {campaign.title || "Untitled Campaign"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {campaign.description || "No description available."}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : campaign.status === "completed"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {campaign.status}
                </span>
                {campaign.end_date && (
                  <p className="text-red-600 text-sm mt-2">
                    Deadline: {calculateTimeLeft(campaign.end_date)}
                  </p>
                )}

                {/* Progress bar */}
                {campaign.goal_amount > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-800 font-semibold mb-2">
                      Goal: USD {campaign.goal_amount || "N/A"}
                    </p>
                    <div className="h-2 bg-gray-300 rounded-full">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{
                          width: `${Math.min(
                            (campaign.totalDonations / campaign.goal_amount) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-800 font-semibold mt-2">
                      Raised: USD {campaign.totalDonations || 0}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => openModal(campaign)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4"
                >
                  View Campaign
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for campaign details */}
      {selectedCampaign && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Campaign Details"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedCampaign.title || "Untitled Campaign"}
            </h2>
            <img
              src={selectedCampaign.banner_image || "https://via.placeholder.com/700x400"}
              alt={selectedCampaign.title || "Campaign"}
              className="w-full h-auto mb-4"
            />
            <p className="text-gray-600 mb-4">
              {selectedCampaign.description || "No description available."}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Goal: USD {selectedCampaign.goal_amount || "N/A"}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Raised: USD {selectedCampaign.totalDonations || 0}
            </p>
            <p className="text-gray-800 font-semibold">
              Status: {selectedCampaign.status}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CampaignListing;
