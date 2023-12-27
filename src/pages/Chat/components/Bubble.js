import React from "react";
import { Box, Typography } from "@mui/material";

function Bubble({ message, currentChat, formatDate }) {
  return (
    <Box
      style={message.fromSelf ? styles.sentBubble : styles.receivedBubble}
      padding={1}
      maxWidth={message.fromSelf ? 400 : 400}
    >
      <Box>
        {!message.fromSelf
          ? currentChat.username + formatDate(message.createdAt)
          : formatDate(message.createdAt)}
        <Typography
          pt={0.5}
          flexWrap={"wrap"}
          style={{ wordWrap: "break-word" }}
        >
          {message.message}
        </Typography>
      </Box>
    </Box>
  );
}

export default Bubble;

const styles = {
  sentBubble: {
    borderRadius: 5,
    backgroundColor: "#e5e5f1",
  },

  receivedBubble: {
    borderRadius: 5,
    backgroundColor: "white",
  },
};
