import React, { useState } from "react";
import {
  Input,
  Box,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({
  onChange,
  placeholder,
  name,
  type = "text",
  handleClickPassword,
  showPassword,
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
        border: `1px solid ${isFocused ? "orange" : "black"}`,
        // padding:'1rem'
      }}
    >
      <TextField
        placeholder={placeholder}
        name={name}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        disableUnderline
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          backgroundColor: "transparent",
          width: "100%",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  );
};

export default PasswordInput;
