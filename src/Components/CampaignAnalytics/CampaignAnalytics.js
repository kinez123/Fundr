import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import supabase  from "../../supabaseClient/supabase";
import Navbar from '../Navbar/Navbar';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CampaignAnalytics = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: campaignsData, error: campaignsError } = await supabase
          .from("Campaigns")
          .select("*");
        if (campaignsError) throw campaignsError;

        const { data: donationsData, error: donationsError } = await supabase
          .from("Donations")
          .select("*");
        if (donationsError) throw donationsError;

        setCampaigns(campaignsData);
        setDonations(donationsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Helper Data Transformations
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const highestFundedCampaign = campaigns.reduce((max, campaign) => {
    const campaignDonations = donations
      .filter((donation) => donation.campaign_id === campaign.campaign_id)
      .reduce((sum, donation) => sum + donation.amount, 0);
    return campaignDonations > max.amount
      ? { name: campaign.title, amount: campaignDonations }
      : max;
  }, { name: "None", amount: 0 });

  const donationsPerCampaign = campaigns.map((campaign) => {
    const total = donations
      .filter((donation) => donation.campaign_id === campaign.campaign_id)
      .reduce((sum, donation) => sum + donation.amount, 0);
    return { title: campaign.title, total };
  });

  const donationsOverTime = donations.reduce((acc, donation) => {
    const date = new Date(donation.donation_date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + donation.amount;
    return acc;
  }, {});

  // Chart Data
  const barChartData = {
    labels: donationsPerCampaign.map((d) => d.title),
    datasets: [
      {
        label: "Total Donations (USD)",
        data: donationsPerCampaign.map((d) => d.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: donationsPerCampaign.map((d) => d.title),
    datasets: [
      {
        data: donationsPerCampaign.map((d) => d.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(donationsOverTime),
    datasets: [
      {
        label: "Donations Over Time (USD)",
        data: Object.values(donationsOverTime),
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Navbar/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Campaign Analytics Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700">Total Campaigns</h2>
          <p className="text-2xl font-bold text-blue-600">{campaigns.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700">Total Donations</h2>
          <p className="text-2xl font-bold text-green-600">USD {totalDonations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700">
            Highest Funded Campaign
          </h2>
          <p className="text-xl font-bold text-purple-600">
            {highestFundedCampaign.name} (USD{highestFundedCampaign.amount})
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Donations Per Campaign
          </h2>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Donations Distribution
          </h2>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Donations Over Time
        </h2>
        <Line data={lineChartData} />
      </div>
    </div>
  );
};

export default CampaignAnalytics;
