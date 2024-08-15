"use client";
import { useState } from "react";
import "./page.css";

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, id: Date.now() }]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="message">
              {msg.text}
            </div>
          ))
        ) : (
          <div className="no-messages">No messages yet.</div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}
