import React from "react";
import { Box, Button, Typography, Modal, Grid, Avatar } from "@mui/material";

function GreyButton({ text, onClick, ...props }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        paddingX: 2,
        border: "1px solid grey",
        textTransform: "none",
        color: "black",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Adjust values as needed
        ...props
      }}
    >
      {text}
    </Button>
  );
}

export default GreyButton;
