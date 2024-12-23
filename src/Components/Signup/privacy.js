import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Privacy Policy
      </h1>
      <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
        "Need to add privacy statements"
      </h3>

      <div className="flex justify-center gap-6 mt-8">
        {/* Link to Terms and Conditions */}
        <Link to="/terms" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Back to Terms and Conditions
        </Link>

        {/* Link to Registration */}
        <Link
          to="/register"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Registration
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

