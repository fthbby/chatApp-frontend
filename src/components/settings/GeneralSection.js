import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import UserInfo from "./UserInfo";
import ManageAcc from "./ManageAcc";
import { useRecoilState } from "recoil";
import { userAtom } from "../../stateManagement/userAtom";

function GeneralSection() {
  const [manage, setManage] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Box>
      <UserInfo setManage={setManage} manage={manage}/>

      {manage && (
        <Box mt={5}>
          <ManageAcc setManage={setManage} />
        </Box>
      )}
    </Box>
  );
}

export default GeneralSection;
