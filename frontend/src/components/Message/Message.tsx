import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface Props {
  author: string,
  message: string,
  date: string
}

const Message: React.FC<Props> = ({ author, message, date }) => {
    return (
      <Card style={{ marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h6">{author}</Typography>
          <Typography variant="body2">{message}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(date).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    );
  };

export default Message;
