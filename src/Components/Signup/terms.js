import React from "react";
import { Link } from 'react-router-dom'; 

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Terms and Conditions
      </h1>

      <section className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Introduction</h3>
          <p className="mt-2">
            Welcome to our platform. By accessing or using our website, you
            agree to comply with the following terms and conditions.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            1. User Responsibilities
          </h3>
          <p className="mt-2">
            As a user, you agree to provide accurate information during
            registration and to use the platform in a lawful manner.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            2. Account Security
          </h3>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>
          <p className="mt-2">
            Do not share your login credentials with third parties.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            3. Donations and Payments
          </h3>
          <p className="mt-2">
            By making a donation, you confirm that the funds you contribute are
            legally acquired and that you understand the donation process and
            associated fees.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            4. Privacy Policy
          </h3>
          <p className="mt-2">
            Your privacy is important to us. Please refer to our{" "}
            <Link to='/privacy' className="text-blue-500">
              Privacy Policy
            </Link>
            {" "}
            for more information.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            5. Limitation of Liability
          </h3>
          <p className="mt-2">
            We are not liable for any damages arising from your use of the
            platform, including loss of data or financial transactions.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            6. Changes to Terms
          </h3>
          <p className="mt-2">
            We may update our Terms and Conditions from time to time. We will
            notify users of significant changes through email or notifications
            on the platform.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            7. Governing Law
          </h3>
          <p className="mt-2">
            These terms are governed by the laws of Sri Lanka, and any disputes
            will be resolved in the appropriate jurisdiction.
          </p>
        </div>
      </section>

      <div className="text-center mt-8">
        <a
          href="form.html"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Back to Registration
        </a>
      </div>
    </div>
  );
};

export default TermsAndConditions;
