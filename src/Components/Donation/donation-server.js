const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://oqcfbchjsdaqmgsvxhmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xY2ZiY2hqc2RhcW1nc3Z4aG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDQ0NjEsImV4cCI6MjA1MDEyMDQ2MX0.W6wQ70heFnq8__K6uZ8wpoLisKYK0lcqU8OLB1H2hTk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware to create receipts directory
const receiptsDir = path.join(__dirname, "receipts");
if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir);
    console.log("Created receipts/ folder.");
}

// Route to send email with receipt
app.post("/donation-completed", async (req, res) => {
    const { donationId } = req.body;

    try {
        // Fetch donation details
        const donationResult = await pool.query("SELECT * FROM Donations WHERE payment_status = Completed", [donationId]);
        const donation = donationResult.rows[0];

        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }

        // Create PDF receipt
        const pdfPath = createReceipt(donation);

        // Send email
        await sendThankYouEmail(donation, pdfPath);

        res.status(200).json({ message: "Thank-you email sent with receipt." });
    } catch (error) {
        console.error("Error handling donation completion:", error);
        res.status(500).json({ error: "Failed to send thank-you email and receipt." });
    }
});

// Function to create PDF receipt
function createReceipt(donation) {
    const pdfPath = path.join(receiptsDir, `receipt_${donation.donation_id}.pdf`);
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(pdfPath));

    pdfDoc.fontSize(26).text("Donation Receipt", { align: "center" });
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text(`Donor Name: ${donation.donor_name}`);
    pdfDoc.text(`Donation Amount: $${donation.amount}`);
    pdfDoc.text(`Campaign: ${donation.campaign.title}`);
    pdfDoc.text(`Date: ${donation.donation_date}`);
    pdfDoc.end();

    return pdfPath;
}

// Function to send thank-you email with receipt
async function sendThankYouEmail(donation, pdfPath) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.PAYPAL_MERCHANT_EMAIL;
        to: donation.email,
        subject: "Thank You for Your Donation!",
        text: `Dear ${donation.donor_name},\n\nThank you for your generous donation of $${donation.amount} to the ${donation.campaign.title} campaign.\nAttached is your receipt for the transaction.\n\nBest regards,\nFundr Team`,
        attachments: [
            {
                filename: `receipt_${donation.donation_id}.pdf`,
                path: path.join(receiptsDir, `receipt_${donation.donation_id}.pdf`),
            },
        ],
    };

    return transporter.sendMail(mailOptions);
}

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
