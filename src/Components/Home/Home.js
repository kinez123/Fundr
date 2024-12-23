import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient/supabase";
import BannerImage from "../Assets/BannerImage.jpg";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      try {
        const { data, error } = await supabase
          .from("Campaigns")
          .select("*")
          .eq("status", "'active'")
          .limit(3);
        if (error) throw error;
        setFeaturedCampaigns(data);
      } catch (error) {
        console.error("Error fetching featured campaigns:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="relative">
        {/* Banner Section */}
        <img
          src={BannerImage}
          alt="Empower Change Through Crowdsourced Fundraising"
          className="w-full h-[50em] object-cover filter brightness-90"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Empower Change Through Crowdsourced Fundraising
      </h1>
      <p className="max-w-3xl mb-6 drop-shadow-md">
        Welcome to our platform, where your generosity has the power to
        change lives. Whether you're raising funds for a medical emergency,
        a community project, or a cause close to your heart, we provide the
        tools and resources to make a real impact. Start a campaign today,
        contribute to a meaningful cause, or explore inspiring stories.
      </p>
          <Link to="/donation">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg rounded-lg font-semibold">
              Donate Now!
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Campaigns Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Featured Campaigns
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading campaigns...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error loading campaigns: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={campaign.banner_image || "https://via.placeholder.com/400x300"}
                  alt={campaign.title || "Campaign"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {campaign.title || "Untitled Campaign"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {campaign.description || "No description available."}
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    Goal: LKR {campaign.goal_amount || "N/A"}
                  </p>
                  <Link
                    to={`/dashboard`}
                    className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Campaign
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
