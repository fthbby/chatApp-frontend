import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";


function CustomLayout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return <Box> {props.children}</Box>;
}

export default CustomLayout;
