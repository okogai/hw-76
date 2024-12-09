import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { IMessage } from '../../types';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <Card style={{ marginBottom: "10px" }}>
      <CardContent>
        <Typography variant="caption" marginRight="10px" color="textDisabled">Posted on:
        </Typography>
        <Typography variant="caption">{message.date}</Typography>
        <Typography variant="body1">
          <span><strong style={{ color: '#1565c0' }}>{message.author}:</strong> {message.message}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
