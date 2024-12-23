import React from "react";
import Navbar from '../Navbar/Navbar';
import './AboutUs.css';

function AboutUsPage() {
    return (
        <div>
            <Navbar />
            <div className="about-container bg-white">
                <div className="about-header text-center mt-20">
                    <h1 className="font-bold text-4xl mb-4">About Our Crowdsourced Fundraising Platform</h1>
                    <p className="text-lg px-10">
                        Our mission is to empower individuals and organizations to raise funds for meaningful causes with ease, transparency, and security.
                        We have created a platform that simplifies the process of fundraising, enhances engagement with supporters, and offers insightful analytics for better decision-making.
                    </p>
                </div>

                <div className="about-features mt-10 px-10">
                    <h2 className="font-bold text-3xl mb-4">Platform Features</h2>

                    <section className="feature">
                        <h3 className="font-bold text-2xl">Streamlined Campaign Creation</h3>
                        <p className="text-lg">
                            Our intuitive campaign creation wizard allows users to easily set up and manage fundraising campaigns.
                            You can customize your campaign’s appearance, set goals, and monitor progress in real-time.
                        </p>
                    </section>

                    <section className="feature">
                        <h3 className="font-bold text-2xl">Comprehensive Donation Processing</h3>
                        <p className="text-lg">
                            We ensure secure and transparent donation processing with real-time tracking. Multiple payment gateways support different payment methods like credit/debit cards and PayPal.
                        </p>
                    </section>

                    <section className="feature">
                        <h3 className="font-bold text-2xl">Enhanced Engagement and Communication</h3>
                        <p className="text-lg">
                            Our platform helps campaign creators engage with their supporters through automatic thank-you notes, updates, and personalized messages. Building a community is key to successful fundraising.
                        </p>
                    </section>

                    <section className="feature">
                        <h3 className="font-bold text-2xl">Advanced Analytics and Insights</h3>
                        <p className="text-lg">
                            With real-time analytics, campaign creators can track donation trends, monitor donor demographics, and receive AI-driven suggestions to optimize their fundraising efforts.
                        </p>
                    </section>
                </div>

                <div className="about-goals mt-10 px-10">
                    <h2 className="font-bold text-3xl mb-4">Our Goals</h2>
                    <ul className="list-disc pl-6 space-y-2 text-lg">
                        <li>To provide a user-friendly experience for both campaign creators and donors.</li>
                        <li>To ensure a secure, transparent, and efficient donation process.</li>
                        <li>To offer real-time insights and analytics for improved fundraising campaigns.</li>
                        <li>To support ongoing communication between campaign creators and supporters.</li>
                    </ul>
                </div>

                <div className="about-contact mt-10 text-center">
                    <h2 className="font-bold text-3xl mb-4">Contact Us</h2>
                    <p className="text-lg">
                        If you have any questions or want to learn more about our platform, feel free to <a href="/contact" className="text-blue-600 underline">Contact Us</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;