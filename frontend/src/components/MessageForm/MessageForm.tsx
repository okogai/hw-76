import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

interface MessageFormProps {
  onSend: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !author) return;

    const data = new URLSearchParams();
    data.set("message", message);
    data.set("author", author);

    await fetch("http://146.185.154.90:8000/messages", {
      method: "POST",
      body: data,
    });

    setMessage("");
    onSend();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Ваше имя"
        variant="outlined"
        fullWidth
        margin="normal"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Сообщение"
        variant="outlined"
        fullWidth
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </form>
  );
};

export default MessageForm;
