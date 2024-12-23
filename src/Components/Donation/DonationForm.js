import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "../Navbar/Navbar";
import supabase from '../../supabaseClient/supabase';

function DonationForm() {
    const [donationAmount, setDonationAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [campaign, setCampaign] = useState("");
    const [message, setMessage] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPaymentButtons, setShowPaymentButtons] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const { data, error } = await supabase
                    .from("Campaigns")
                    .select("campaign_id, title");

                if (error) {
                    console.error("Error fetching campaigns:", error);
                    alert("Failed to fetch campaigns. Please try again later.");
                } else {
                    setCampaigns(data);
                }
            } catch (error) {
                console.error("Error in fetchCampaigns:", error);
                alert("An unexpected error occurred while fetching campaigns.");
            }
        };

        fetchCampaigns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = parseFloat(donationAmount);

        if (!donationAmount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid donation amount greater than 0!");
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }
        if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
            alert("Please enter a valid phone number (10-15 digits)!");
            return;
        }

        setShowPaymentButtons(true);

    };

    async function insertDonation({ campaignId, donorId, amount, paymentMethod, paymentStatus }) {
        try {
            const { data, error } = await supabase
                .from('Donations')
                .insert({
                    campaign_id: campaignId,
                    donor_id: donorId,
                    amount: parseFloat(amount),
                    payment_method: paymentMethod,
                    payment_status: paymentStatus,
                    donation_date: new Date().toISOString(),
                });

            if (error) {
                console.error("Error inserting donation:", error);
                alert("Failed to save donation to the database.");
            } else {
                alert("Donation recorded successfully!");
            }

            return { data, error };
        } catch (error) {
            console.error("Error in insertDonation:", error);
            throw error;
        }
    }

    
    const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

    if (!PAYPAL_CLIENT_ID) {
        console.error("PayPal Client ID is not defined. Please check your environment variables.");
        return <div>Error: PayPal is not configured properly.</div>;
    }

    return (
        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <div className="font-sans">
                <Navbar />
                <div className="h-[100vh] mt-[4em] mb-10 flex flex-col items-center bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
                    <h1 className="mb-8 mt-[1em] text-white text-3xl font-bold">Fundr Donate</h1>
                    <form
                        className="flex flex-col p-8 w-[60em] bg-white rounded-lg shadow-lg focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                        onSubmit={handleSubmit}
                    >
                        {/* Donation Amount */}
                        <div className="flex items-center mb-6">
                            <label htmlFor="donation-amount" className="font-medium w-1/3 text-right pr-5">
                                Donation Amount:
                            </label>
                            <input
                                type="text"
                                id="donation-amount"
                                placeholder="Enter Amount"
                                className="p-3 w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ring-blue-400 hover:border-blue-500"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                required
                            />
                        </div>

                        {/* Name */}
                        <div className="flex items-center mb-6">
                            <label className="font-medium w-1/3 text-right pr-5">Name:</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className={`p-3 w-2/3 rounded-lg border ${anonymous ? "bg-gray-200 text-gray-500" : "border-gray-300"} focus:outline-none focus:ring-2 ${anonymous ? "ring-gray-200" : "ring-blue-400 hover:border-blue-500"}`}
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                disabled={anonymous}
                            />
                        </div>

                        {/* Anonymous Donation */}
                        <div className="flex items-center justify-center mb-6">
                            <input
                                type="checkbox"
                                id="anonymous"
                                className="mr-2 hover:border-blue-500"
                                checked={anonymous}
                                onChange={(e) => setAnonymous(e.target.checked)}
                            />
                            <label htmlFor="anonymous" className="font-medium">
                                Donate Anonymously
                            </label>
                        </div>

                        {/* Email */}
                        <div className="flex items-center mb-6">
                            <label className="font-medium w-1/3 text-right pr-5">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="p-3 w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ring-blue-400 hover:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex items-center mb-6">
                            <label className="font-medium w-1/3 text-right pr-5">Phone:</label>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                className="p-3 w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ring-blue-400 hover:border-blue-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Campaign Selection */}
                        <div className="flex items-center mb-6">
                            <label className="font-medium w-1/3 text-right pr-5">Select Campaign:</label>
                            <select
                                className="p-3 w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ring-blue-400 hover:border-blue-500"
                                value={campaign}
                                onChange={(e) => setCampaign(e.target.value)}
                                required
                            >
                                <option value="">Select Campaign</option>
                                {campaigns.map((c) => (
                                    <option key={c.campaign_id} value={c.campaign_id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Message */}
                        <div className="flex items-start mb-6">
                            <label className="font-medium w-1/3 text-right pr-5">Message:</label>
                            <textarea
                                className="p-3 w-2/3 h-24 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ring-blue-400 hover:border-blue-500"
                                placeholder="Enter Message (Optional)"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`p-3 w-1/3 text-white rounded-lg ${loading ? "bg-blue-700 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900"} transition-all duration-300 ease-in-out`}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Donate"}
                            </button>
                        </div>
                    </form>

                    {/* PayPal Button */}
                    {showPaymentButtons && (
                        <PayPalButtons
                            style={{
                                color: "blue",
                                shape: "rect",
                                height: 40,
                            }}
                            fundingSource="paypal"
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: donationAmount,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                const order = await actions.order.capture();
                

                                if (order.status === "COMPLETED") {
                                    console.log("ITS HERE:", campaign);
                                    const donorId = '2b6aa0f6-59cd-43d7-bfa5-5a7843dad1ff'; // Replace with actual donor_id from user state
                                    const paymentMethod = "PayPal";
                                    const paymentStatus = "Completed";
                                    const campaign_id = campaign;
                                   

                                    insertDonation({ campaignId: campaign_id, donorId, amount: donationAmount, paymentMethod, paymentStatus });
                                } else {
                                    console.error("Order capture failed:", order);
                                    alert("Payment failed. Please try again.");
                                }
                            }}
                            onCancel={() => {
                                console.log("Donation cancelled");
                                alert("Donation cancelled.");
                            }}
                            onError={(err) => {
                                console.error("PayPal Checkout onError:", err);
                                alert("An error occurred during the PayPal payment. Please try again.");
                            }}
                        />
                    )}
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

export default DonationForm;
