import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import UserInfo from "./UserInfo";
import ManageAcc from "./ManageAcc";

function GeneralSection() {
  const [manage, setManage] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    let parsed = JSON.parse(localStorage.getItem("chat-app-user"));
    setUser(parsed);
  }, []);

  return (
    <Box>
      <UserInfo setManage={setManage} user={user} />
      {manage && (
        <Box mt={5}>
          <ManageAcc user={user} setManage={setManage} />
        </Box>
      )}
    </Box>
  );
}

export default GeneralSection;
