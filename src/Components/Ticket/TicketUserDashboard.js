import React, { useState } from "react";
import axios from "axios";

function TicketUserDashboard() {

  const [ticketStatus, setTicketStatus] = useState("Open");

  const API_URL = "http://localhost:5000/api/tickets";
  const nextStage = async () => {
    const statuses = ["Open", "In Progress", "Resolved"];
    const currentIndex = statuses.indexOf(ticketStatus);
    if (currentIndex === -1 || currentIndex === statuses.length - 1) return;
  
    const newStatus = statuses[currentIndex + 1];
    try {
      const response = await axios.put(`${API_URL}/tickets/`, { status: newStatus });
      if (response.data.success) {
        setTicketStatus(newStatus);
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Ticket Status</h2>

      {/* Multi-Step Progress */}
      <div className="flex items-center justify-between mb-6">
        {/* Open */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
              ticketStatus === "Open" || ticketStatus === "In Progress" || ticketStatus === "Resolved"
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          >
            1
          </div>
          <span className="ml-2 text-gray-800 font-medium">Open</span>
        </div>
        <div
          className={`h-1 flex-1 ${
            ticketStatus === "In Progress" || ticketStatus === "Resolved" ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>
        {/* In Progress */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
              ticketStatus === "In Progress" || ticketStatus === "Resolved" ? "bg-yellow-500" : "bg-gray-300"
            }`}
          >
            2
          </div>
          <span className="ml-2 text-gray-800 font-medium">In Progress</span>
        </div>
        <div
          className={`h-1 flex-1 ${ticketStatus === "Resolved" ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
        {/* Resolved */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
              ticketStatus === "Resolved" ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            3
          </div>
          <span className="ml-2 text-gray-800 font-medium">Resolved</span>
        </div>
      </div>

      {/* Ticket Message */}
      <div className="p-4 bg-gray-100 rounded-lg">
        {ticketStatus === "Open" && <p>Your ticket has been taken into consideration.</p>}
        {ticketStatus === "In Progress" && <p>Your ticket is currently being worked on.</p>}
        {ticketStatus === "Resolved" && <p>Your ticket has been resolved!</p>}
      </div>

      {/* Mock Update Button */}
      <button
        onClick={nextStage}
        disabled={ticketStatus === "Resolved"}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {ticketStatus === "Resolved" ? "Completed" : "Move to Next Stage"}
      </button>
    </div>
  );
}

export default TicketUserDashboard;

