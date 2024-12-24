import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [minimized, setMinimized] = useState(false); // Track if the chatbot is minimized
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const predefinedResponses = {
    // Greetings and Introduction
    "hello": "Hi there! How can I help you today?",
    "hi": "Hello! What do you need help with?",
    "good morning": "Good morning! How can I assist you today?",
    "good evening": "Good evening! What can I do for you?",
    "who are you": "I'm a chatbot here to make things easier for you!",
    "what is your name": "I'm am Fundr an integrated AI here to make things easier for you!",
    
    // Crowdfunding Basics
    "what is crowdfunding": "Crowdfunding is when people give money to help an idea or a cause.",
    "why should I donate": "Donating helps people, projects, or causes you care about.",
    "can I start a campaign for school": "Yes! You can start a campaign for your school or class.",
    "how does crowdfunding work": "You share your idea, people donate, and you use the money to make it happen!",
    
    // Donations
    "how to donate": "Click the 'Donate' button and pick the project you want to help!",
    "is my donation safe": "Yes! We make sure all donations are secure.",
    "how much can I donate": "You can donate any amount you like. Every bit helps!",
    "can I donate anonymously": "Yes, you can hide your name if you want.",
    "how do I see my donations": "Log into your account and check your donation history.",
    
    // Campaign Management
    "how to start campaign": "Click 'Start a Campaign' and tell us about your idea!",
    "can I edit my campaign": "Yes, go to your dashboard and make changes there.",
    "how do I delete my campaign": "Go to your dashboard and select 'Delete Campaign'.",
    "how to share my campaign": "Click 'Share' and send your campaign link to friends and family.",
    "what happens if my campaign fails": "Donors might get their money back or it could go to you, depending on the rules.",
    
    // Payment and Transactions
    "what payment methods can I use": "We accept cards, PayPal, and other options.",
    "how do I withdraw my funds": "Go to your dashboard and click 'Withdraw Funds'.",
    "are transactions safe": "Yes, all payments are protected with top security measures.",
    "what currencies are supported": "We support many currencies. Choose your preferred one when donating.",
    "how long does it take for donations to process": "Donations are usually quick, but it can take up to 24 hours.",
    
    // Account and User Roles
    "how to register": "Click 'Sign Up' and enter your details. You are done!",
    "can I run more than one campaign": "Yes, you can run multiple campaigns at once.",
    "how do I delete my account": "Go to settings and select 'Delete Account'.",
    "what are user roles": "There are creators, donors, and admins. Each has different tools to use.",
    "can kids start campaigns": "Yes! Ask an adult to help you if needed.",
    
    // Support and Help
    "how to contact support": "Email us at support@crowdfundingplatform.com or use the live chat.",
    "how to report a campaign": "Click 'Report' on the campaign page and tell us why.",
    "can I ask questions": "Of course! I m here to help you with anything.",
    "what if I forgot my password": "Click 'Forgot Password' on the login page to reset it.",
    "is there a help section": "Yes, check our FAQ or ask me your question!",
    
    // Extra Features
    "what is analytics": "It shows numbers about your campaign to help you do better.",
    "how do I see updates for a campaign": "Follow the campaign, and you will get updates.",
    "how to thank donors": "Send them messages or post updates in your campaign.",
    "what is a ticket system": "It s a way to send us questions or problems so we can help you.",
    
    // Encouraging Words
    "i am nervous to start": "Don t worry! Every big idea starts small. Go for it!",
    "what if no one donates": "Keep sharing your campaign! It can take time, but you will get there.",
    "i need help with my campaign": "Check our help guides or ask me for tips!",
    
    // Fun and Relatable
    "can I raise money for my dog": "Yes! Start a campaign to help your furry friend.",
    "can I donate 1 dollar": "Of course! Every little bit helps a lot.",
    "what if I want to help animals": "Search for animal-related campaigns and donate!",
    "can I use the platform on my phone": "Yes! You can use our app or website on your phone.",
    "do I need to log in to see campaigns": "No, you can browse campaigns without logging in.",
    
    // Miscellaneous
    "what happens after I donate": "The campaign creator gets the money to help their project.",
    "can I change my donation amount": "Contact support, and we ll help you make changes.",
    "is the platform free to use": "It s free to join! We only take a small fee from donations.",
    "default": "I m not sure about that. Could you ask it another way?"
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    const botReplyText =
      predefinedResponses[userInput.toLowerCase()] || predefinedResponses.default;
    const botMessage = { sender: "bot", text: botReplyText };

    setMessages((prev) => [...prev, botMessage]);
    setUserInput("");
    setLastActivityTime(Date.now());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      setMinimized(true); 
    }, 5000);

   
    return () => clearTimeout(inactivityTimeout);
  }, [lastActivityTime]); 
  const handleChatbotClick = () => {
    setMinimized(false); 
    setLastActivityTime(Date.now()); 
  };

  const toggleMinimize = (e) => {
    // Prevent toggle from triggering if clicking inside the chat or input area
    if (e.target.closest('.chatbot-header') || e.target.closest('.chatbot-messages') || e.target.closest('.chatbot-input')) {
      return;
    }
    setMinimized((prev) => !prev); // Toggle minimized state
  };

  return (
    <div
      className={`chatbot-container ${minimized ? "minimized" : ""}`}
      onClick={toggleMinimize} // Only toggle when clicking outside chat area
    >
      {!minimized && (
        <>
          <div className="chatbot-header">Fundr Chatbot</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                setLastActivityTime(Date.now());
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
      {minimized && (
        <div className="chatbot-circle">
          <span>?</span> 
        </div>
      )}
    </div>
  );
};

export default Chatbot;


