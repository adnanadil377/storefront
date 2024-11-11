import axios from 'axios';
import React, { useState } from 'react';
import './chat.css';

// Helper function to clean and format response
const formatResponse = (text) => {
  return text
    .trim()                      // Remove leading/trailing spaces
    .replace(/\n+/g, '\n')        // Replace multiple newlines with a single one
    .replace(/(\r\n|\n|\r)/g, '<br />'); // Replace line breaks with HTML line break tags
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state for the bot's reply

  const sendMessage = async () => {
    if (userInput.trim() === "") return;  // Prevent sending empty messages

    // Append the user's message to the message history
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput(""); // Clear the input field

    // Show loading indicator while waiting for the bot's response
    setLoading(true);

    try {
      // Build context from the previous messages, excluding the last user message
      let context = "";
      if (newMessages.length > 1) {
        context = newMessages.slice(0, -1).map((m) => `${m.sender}: ${m.text}`).join("\n");
      }

      // Send the POST request with the user's message (and optionally context)
      const response = await axios.post('http://localhost:8000/api/gemini_chatbot/', {
        message: userInput,
        context: context,  // Pass the context if you want the bot to be context-aware
      });

      // Format the bot's response before appending it to the message history
      const formattedResponse = formatResponse(response.data.response);

      // Append the formatted bot's response to the message history
      setMessages([...newMessages, { text: formattedResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error: Could not connect to chatbot.", sender: 'bot' }]);
    } finally {
      setLoading(false);  // Stop the loading indicator after the response is received
    }
  };

  return (
    <div
      className={`fixed bottom-14 right-4 bg-white backdrop-blur-sm	 p-6 rounded-3xl shadow-lg w-[420px] max-h-[450px] mb-10 flex flex-col 
        ${loading ? "animate-border-gradient" : ""}`}
    >
      {/* Message history container */}
      <div className="overflow-y-auto flex-1 space-y-4 mb-2 text-sm">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-4 max-w-xs rounded-3xl text-base ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}
            >
              {/* Render HTML if the response contains <br /> */}
              <div dangerouslySetInnerHTML={{ __html: message.text }} />
            </div>
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="flex items-center space-x-3 mt-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-2xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => { if (e.key === "Enter") sendMessage() }}  // Send message on Enter key
          disabled={loading}  // Disable input while loading
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-2xl disabled:bg-blue-300"
          onClick={sendMessage}
          disabled={loading}  // Disable button while loading
        >
          {loading ? "Thinking..." : "Send"}  {/* Show loading state */}
        </button>
      </div>

      {/* Dot Loading Animation */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
          <div className="flex space-x-3">
            <div className="dot w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="dot w-4 h-4 bg-gray-500 rounded-full animate-bounce200"></div>
            <div className="dot w-4 h-4 bg-gray-500 rounded-full animate-bounce400"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
