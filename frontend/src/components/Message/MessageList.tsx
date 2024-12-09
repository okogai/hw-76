import Message from "./Message";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { fetchLoadingSelector, messagesSelector } from '../../store/slices/messagesSlice.ts';
import {useEffect} from "react";
import {messagesFetch} from "../../store/thunks/messagesThunks.ts";
import { Box, CircularProgress, Typography } from '@mui/material';

const MessageList = () => {
  const messages = useAppSelector(messagesSelector);
  const loading = useAppSelector(fetchLoadingSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messagesFetch());
  },[dispatch]);


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {messages.length === 0 &&  !loading ? (
        <Typography variant="h6" color="textSecondary">
          No messages yet
        </Typography>
      ) : (
        messages
          .slice()
          .reverse()
          .map((message) => <Message key={message.id} message={message} />)
      )}
    </div>
  );
};

export default MessageList;
