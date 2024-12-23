import React from "react";
import TicketForm from "./TicketForm";
import UserDashboard from "./TicketUserDashboard";
import Navbar from '../Navbar/Navbar';

function TicketApp() {
  return (
    <div className="mx-auto p-5 bg-indigo-100">
      <Navbar/>
      <h1 className="text-white text-3xl font-bold text-center mb-10">Ticketing System</h1>
      <TicketForm />
      <UserDashboard />
    </div>
  );
}

export default TicketApp;
