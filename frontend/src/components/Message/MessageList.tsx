import React from "react";
import Message from "./Message";

interface MessageListProps {
  messages: {
    message: string;
    author: string;
    datetime: string;
  }[];
}

const MessageList: React.FC<MessageListProps> = React.memo(({ messages }) => {
  return (
    <div>
      {messages.map((msg) => (
        <Message key={msg.datetime} {...msg} />
      ))}
    </div>
  );
});

export default MessageList;
