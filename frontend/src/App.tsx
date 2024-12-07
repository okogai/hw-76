import React, { useState, useEffect } from "react";
import "./App.css";
import MessageList from "../src/components/Message/MessageList";
import MessageForm from "../src/components/MessageForm/MessageForm";
import { Container, CircularProgress, Box } from "@mui/material";
import { IMessages } from "./types";

const App: React.FC = () => {
  const url = "http://146.185.154.90:8000/messages";
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDatetime, setLastDatetime] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const fetchUrl = lastDatetime ? `${url}?datetime=${lastDatetime}` : url;
      const response = await fetch(fetchUrl);
      const data: IMessages[] = await response.json();

      if (data.length > 0) {
        const lastMessageDate = data[data.length - 1].datetime;

        if (lastMessageDate === lastDatetime) {
          return;
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          ...data.filter(
            (msg) =>
              !prevMessages.some(
                (existingMsg) => existingMsg.datetime === msg.datetime,
              ),
          ),
        ]);

        setLastDatetime(lastMessageDate);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMessages();
    })();

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime]);

  return (
    <Container>
      <h1>Attractor chat</h1>
      <Box sx={{ mb: 2 }}>
        <MessageForm onSend={fetchMessages} />
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <MessageList messages={messages} />
      )}
    </Container>
  );
};

export default App;
