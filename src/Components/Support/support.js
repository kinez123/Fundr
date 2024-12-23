import React, { useState } from "react";
import Navbar from '../Navbar/Navbar';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent,  Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';
import Chatbot from '../Chatbot/Chatbot';

const faqs = [
  {
    question: "What is a crowdfunding platform?",
    answer: "A crowdfunding platform is an online service that allows individuals and organizations to raise money from a large number of people who each contribute a small amount. It provides a way to fund projects, causes, and ventures without the need for traditional loans or investments."
  },
  {
    question: "How does the crowdfunding process work?",
    answer: "Step 1: Create a project or campaign with a compelling story and goal. Step 2: Share your campaign with your network and community via social media, email, and other channels. Step 3: Receive contributions from supporters who believe in your cause. Step 4: Once the funding goal is reached, the funds are transferred to you to complete your project or cause. Step 5: You provide updates and thank contributors for their support."
  },
  {
    question: "What types of projects can I fund on this platform?",
    answer: "You can fund a variety of projects including but not limited to creative projects, business ideas, charity causes, events, and personal goals. Examples include launching a new product, funding a startup, medical expenses, education, and community development."
  },
  {
    question: "What fees are associated with using the crowdfunding platform?",
    answer: "The platform typically charges a small percentage of the total funds raised as a service fee. Additionally, payment processors (like PayPal or Stripe) may charge a fee for processing the donations. Fees vary based on the platform, but they are clearly listed before you launch your campaign."
  },
  {
    question: "How long do campaigns last?",
    answer: "Campaigns typically last between 30 to 60 days, but some platforms may offer flexible durations. The duration can be selected when you create your campaign, based on how much time you believe is needed to reach your funding goal."
  },
  {
    question: "Can I update my campaign after it has launched?",
    answer: "Yes, you can update your campaign page at any time. You can provide project progress updates, respond to questions from donors, and thank contributors. Regular communication can help build trust and encourage further support."
  },
  {
    question: "What happens if I don’t reach my funding goal?",
    answer: "If your campaign does not reach its funding goal by the end of the campaign period, no funds are collected. This ensures that only successful campaigns receive funding. You can re-launch a new campaign if desired."
  },
  {
    question: "Can I withdraw funds if my campaign is successful?",
    answer: "Yes, once your campaign reaches its funding goal, the funds will be transferred to you, minus any applicable fees. Most platforms use secure payment processing services to handle these transactions."
  },
  {
    question: "What happens to my personal information and donations?",
    answer: "Personal information is typically used only for the purposes of your campaign and donor communication. It is protected and not shared publicly. Donations are handled securely through payment processors like PayPal or Stripe."
  },
  {
    question: "Can I remain anonymous when donating or receiving funds?",
    answer: "Yes, donors can choose to remain anonymous if the campaign creator allows it. Campaign creators can also opt to remain anonymous when they receive funds."
  },
  {
    question: "Are there any restrictions on the type of projects that can be crowdfunded?",
    answer: "Yes, most platforms prohibit campaigns related to illegal activities, hate speech, harmful activities, or anything that violates the terms of service. Make sure your campaign aligns with the platform's guidelines."
  },
  {
    question: "What should I do if I encounter issues or have questions?",
    answer: "Contact the platform’s support team directly via email or through the platform’s contact form. Most platforms provide an FAQ section and help articles to answer common questions."
  },
  {
    question: "How secure is my data and the transaction process?",
    answer: "Crowdfunding platforms employ advanced security measures to protect both the donor's personal information and the financial transactions. They use encryption and other secure protocols to ensure that your data is safe."
  },
  {
    question: "Can I change my payment method after I’ve started my campaign?",
    answer: "Yes, you can usually update your payment details through your account settings. Check with your specific platform for exact procedures."
  },
  {
    question: "What if I need to refund a donation?",
    answer: "Refunds are typically initiated through the platform’s system. Donors should contact the campaign owner first, who can then initiate the refund through the platform. Refund policies vary, so it's important to review the terms before accepting contributions."
  }
];

const guides = [
    { title: "Creating a Successful Campaign", description: "Tips and strategies to create an effective crowdfunding campaign." },
    { title: "Understanding Fees and Charges", description: "An in-depth look at the fees associated with using a crowdfunding platform." },
    { title: "Effective Marketing for Crowdfunding", description: "Learn how to promote your campaign and reach a wider audience." },
    { title: "Legal Considerations in Crowdfunding", description: "Understand the legal aspects and requirements for launching a crowdfunding campaign." },
    { title: "Building and Engaging a Community", description: "Strategies for building a strong supporter base and engaging with your donors." },
    { title: "Managing Campaign Updates", description: "Best practices for providing regular updates to maintain donor confidence and engagement." }
  ];
  

  const articles = [
    { title: "How to Promote Your Campaign", description: "Learn effective marketing strategies for your crowdfunding campaign." },
    { title: "Maximizing Donations", description: "Tips for increasing donations through effective messaging." },
    { title: "How to Create Engaging Campaign Videos", description: "Tips and tricks for making compelling videos to showcase your project." },
    { title: "Understanding Donor Psychology", description: "Insights into why donors contribute and how to appeal to them effectively." },
    { title: "Handling Negative Feedback and Criticism", description: "Strategies for managing and responding to negative comments and feedback on your campaign." },
    { title: "Leveraging Social Media for Your Campaign", description: "Utilizing platforms like Facebook, Twitter, and Instagram to drive support and donations." }
  ];
  
  function SupportPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({ title: "", description: "" });
  
    const handleOpenDialog = (title, description) => {
      setDialogContent({ title, description });
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    return (
      <div>
        <Navbar />
  
        <div className="flex flex-col bg-white w-[119.3em] h-[110em]">
          <div className="flex flex-col items-center mt-20">
            <h1 className="mb-2 font-bold text-3xl">Support</h1>
            <h4 className="text-xl">Find answers to common questions, step-by-step guides, and detailed articles.</h4>
          </div>
  
          <div>
            <h1 className="ml-10 font-bold text-3xl">FAQs</h1>
            <div className="ml-10 mt-5 space-y-4">
              {faqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
  
          <div>
            <h1 className="ml-10 mt-5 font-bold text-3xl">Guides</h1>
            <div className="ml-10 mt-5 grid grid-cols-3 gap-4">
              {guides.map((guide, index) => (
                <Card
                  key={index}
                  className="rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleOpenDialog(guide.title, guide.description)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {guide.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {guide.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
  
          <div>
            <h1 className="ml-10 mt-5 font-bold text-3xl">Articles</h1>
            <div className="ml-10 mt-5 grid grid-cols-3 gap-4">
              {articles.map((article, index) => (
                <Card
                  key={index}
                  className="rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleOpenDialog(article.title, article.description)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
          
        <Chatbot/>

        <div className="bg-green-50/50 hover:bg-green-50 rounded-lg shadow-lg p-4 transition transform hover:-translate-y-1 hover:shadow-xl">
          <Link to="/ticketing" className="text-gray-600 hover:text-green-800 text-lg font-bold tracking-wide hover:underline transition">
            Report an issue
          </Link>
        </div>

  
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {dialogContent.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export { SupportPage };
  
  export default SupportPage;