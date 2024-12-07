import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { IMessage } from '../../types';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <Card style={{ marginBottom: "10px", padding: "1rem" }}>
      <CardContent>
        <Typography variant="caption" marginRight="10px" color="textDisabled">Posted on:
        </Typography>
        <Typography variant="caption">
          {new Date(message.date).toLocaleString()}
        </Typography>
        <Typography variant="h6" color="info">{message.author}</Typography>
        <Divider sx={{marginY: "10px"}} />
        <Typography variant="body1">{message.message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
