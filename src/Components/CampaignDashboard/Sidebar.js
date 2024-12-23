// src/Components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-3 text-center">Navigation</h2>
      <ul className="list-none">
        <li className="mb-2"><Link to="/dashboard">Dashboard</Link></li>
        <li className="mb-2">
          <Link to="/campaign-analytics">
            Campaign Analytics
          </Link>
        </li>
        <li className="mb-2"><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
