import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

function Bubble({ message, currentChat }) {
  const formatDate = (message) => {
    return dayjs(message).format("MM/DD/YYYY hh:mma");
  };
  return (
    <Box
      style={message.fromSelf ? styles.sentBubble : styles.receivedBubble}
      padding={1}
      maxWidth={message.fromSelf ? 400 : 400}
    >
      <Box>
        {!message.fromSelf
          ? currentChat.firstName + ' ' + currentChat.lastName + ' ' + formatDate(message.createdAt)
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
    borderBottomLeftRadius: 10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomRightRadius:0,
    backgroundColor: "#e5e5f1",
  },

  receivedBubble: {
    borderRadius: 5,
    backgroundColor: "white",
  },
};
