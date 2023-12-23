import React from "react";
import { Box, Button, Typography, TextField, Grid, Input } from "@mui/material";
import CustomTextField from "../buttons/CustomTextField";
import GreyButton from "../buttons/GreyButton";

function ManageAcc({ user, setManage }) {
  return (
    <Box border={"1px solid gray"} borderRadius={1} padding={2}>
      <CustomTextField title="Username" placeholder={user.username} />

      <CustomTextField title="Email" placeholder={user.email} />
      <CustomTextField title="First Name" placeholder={user.firstName} />
      <CustomTextField title="Last Name" placeholder={user.lastName} />

      <Box pt={5} display={"flex"} justifyContent={"flex-end"}>
        <GreyButton text="Save" mr={3} />
        <GreyButton text="Cancel" onClick={() => setManage(false)} />
      </Box>
    </Box>
  );
}

export default ManageAcc;
