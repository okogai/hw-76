import Message from "./Message";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {messagesSelector} from "../../store/slices/messagesSlice.ts";
import {useEffect} from "react";
import {messagesFetch} from "../../store/thunks/messagesThunks.ts";

const MessageList = () => {
  const messages = useAppSelector(messagesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messagesFetch());
  },[dispatch]);

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} author={message.author} message={message.message} date={message.date} />
      ))}
    </div>
  );
};

export default MessageList;
