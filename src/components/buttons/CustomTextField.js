import React from "react";
import { Box, Button, Typography, TextField, Grid, Input } from "@mui/material";

function CustomTextField({title, placeholder}) {
  return (
    <>
      <Typography fontSize={12}>{title}</Typography>
      <TextField variant="filled" placeholder={placeholder} />
    </>
  );
}

export default CustomTextField;
