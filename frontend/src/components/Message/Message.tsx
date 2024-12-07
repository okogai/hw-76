import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { IMessages } from "../../types";

const Message: React.FC<IMessages> = React.memo(
  ({ message, author, datetime }) => {
    return (
      <Card style={{ marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h6">{author}</Typography>
          <Typography variant="body2">{message}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(datetime).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    );
  },
);

export default Message;
