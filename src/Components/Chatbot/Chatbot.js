import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [minimized, setMinimized] = useState(false); // Track if the chatbot is minimized

  const predefinedResponses = {
    // ... (same as before)
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleMinimize = () => {
    setMinimized((prev) => !prev); // Toggle minimized state
  };

  return (
    <div
      className={`chatbot-container ${minimized ? "minimized" : ""}`}
      onClick={toggleMinimize}
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
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
      {minimized && (
        <div className="chatbot-circle">
          <span>?</span> {/* You can change this to any icon */}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
