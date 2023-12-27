import React, { useState } from "react";
import { Input, Box, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomInput = ({
  onChange,
  placeholder,
  name,
  type = "text",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        borderRadius: "0.4rem",
        overflow: "hidden", // Ensure the border-radius is applied correctly
        border: `2px solid ${isFocused ? "orange" : "black"}`,
        
      }}
    >
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        disableUnderline
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          backgroundColor: "transparent",
          width: "100%",
        }}
        {...props}
      />
    </Box>
  );
};

export default CustomInput;
