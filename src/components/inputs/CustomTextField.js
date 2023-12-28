import React from "react";
import { Typography, Grid, Input } from "@mui/material";

function CustomTextField({
  title,
  value,
  handleProfile,
  profile,
  name,
  ...props
}) {
  return (
    <>
      <Typography fontSize={12}>{title}</Typography>
      <Input
        name={name}
        onChange={(e) => handleProfile(e)}
        sx={{
          borderRadius: "5px",
          // px: 1,
          marginBottom: 2,
        }}
        value={profile && profile[name] ? profile[name] : ""}
        {...props}
      />
    </>
  );
}

export default CustomTextField;
