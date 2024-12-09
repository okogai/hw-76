import React, { ChangeEvent, useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { messagesFetch, sendMessage } from '../../store/thunks/messagesThunks.ts';
import { IMessageMutation } from '../../types';
import { sendMessageLoadingSelector } from '../../store/slices/messagesSlice.ts';

const initialState = {
  author: '',
  message: ''
}

const MessageForm = () => {
  const [form, setForm] = useState<IMessageMutation>(initialState);
  const loading = useAppSelector(sendMessageLoadingSelector);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {author, message} = form;

    if (author.trim() === '' || message.trim() === '') {
      alert("Please fill in all fields ");
    } else {
      await dispatch(sendMessage(form));
      await dispatch(messagesFetch());
      setForm(initialState);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}
         sx={{display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           paddingY: '1rem',
           paddingX: '2rem',
           marginBottom: '2rem',
           boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);'
         }}>
      <Typography variant="h5">Send message</Typography>
      <TextField
        label="Enter your name"
        name="author"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        value={form.author}
        onChange={handleChange}
        required
      />
      <TextField
        label="Enter your message"
        name="message"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        value={form.message}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{marginTop: "15px", width: "90px"}} disabled={loading}>
        {loading
          ? <CircularProgress size="24px"/>
          : 'Send'}
      </Button>
    </Box>

  );
};

export default MessageForm;
