import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";

function OtherUserHeader({ currentChat }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      padding={"2rem 1rem"}
      borderBottom={"1px solid #ABAAAA"}
    >
      <Avatar sx={{ mr: 2 }} src={currentChat?.image} />
      <Typography fontWeight={600}>
        {currentChat?.firstName ? (
          <Box>
            {currentChat?.firstName} {currentChat?.lastName}
          </Box>
        ) : (
          currentChat?.username
        )}
      </Typography>
    </Box>
  );
}

export default OtherUserHeader;
