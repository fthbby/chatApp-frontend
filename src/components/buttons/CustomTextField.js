import React from "react";
import { Box, Button, Typography, Grid, Input } from "@mui/material";

function CustomTextField({ title, value, handleProfile, profile,name, ...props }) {
  return (
    <>
      <Typography fontSize={12}>{title}</Typography>
      <Input
        name={name}
        onChange={(e) => handleProfile(e)}
        sx={{
          borderRadius: "5px",
          mt: 1,
          height: 49,
          px: 1,
        }}
        value={profile && profile[name] ? profile[name] : ""}

        {...props}

      />
    </>
  );
}

export default CustomTextField;
