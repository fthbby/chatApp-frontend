import React from "react";
import Logo from "../assets/TeamsLogo.png";
import { Box, Typography } from "@mui/material";

function TeamsLogo() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"1rem"}
      justifyContent={"center"}
    >
      <Box component={"img"} src={Logo} alt="" height={"5rem"} />
      <Typography variant="h4" textTransform={"uppercase"}>
        TeamsCLONE
      </Typography>
    </Box>
  );
}

export default TeamsLogo;
