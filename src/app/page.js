"use client";
import { useState, useContext } from "react";
import { Button, Typography, Paper, Box, TextField } from "@mui/material";
import { keyframes } from "@emotion/react";
import { AuthContext } from "../components/authContext.js";
import "./page.css";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You: ${inputValue}`, id: Date.now() },
      ]);

      try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: inputValue }],
          }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `You: ${inputValue}`, id: Date.now() },
          { text: `AI: ${data.message}`, id: Date.now() },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }

      setInputValue(""); // Clear input field after submission
    }
  };
  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          p: 3,
          animation: `${bounce} 2s infinite`,
        }}
      >
        <Paper
          sx={{
            padding: 3,
            textAlign: "center",
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            You need to log in to access the chat.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/login"
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </Paper>
      </Box>
    );
  }

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
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          className="send-button"
        >
          Send
        </Button> */}
      </form>
    </div>
  );
}
