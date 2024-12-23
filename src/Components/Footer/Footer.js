import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm">
            Empowering change through crowdsourced fundraising. Join us in making a difference for causes that matter.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul>
            <li>
              <a
                href="/listings"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Browse Campaigns
              </a>
            </li>
            <li>
              <a
                href="/wizard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Start a Campaign
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:support@fundraisingplatform.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              support@fundraisingplatform.com
            </a>
          </p>
          <p className="text-sm">Phone: +94 123 456 789</p>

          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Fundraising Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
