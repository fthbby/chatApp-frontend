import React from "react";
import { Button, InputAdornment, Typography, IconButton } from "@mui/material";

function PurpleButton({ onClick, text }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "#5558ae",
        height: "50px",
        borderRadius: "0.4rem",
        fontSize: "1.4rem",
        fontWeight: 600,
        color: "white",
        boxShadow: 1,
        transition: "0.5s ease-in-out",
        "&:hover": {
          backgroundColor: "black",
        },
      }}
    >
      {text}
    </Button>
  );
}

export default PurpleButton;
