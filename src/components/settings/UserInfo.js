import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import GreyButton from "../buttons/GreyButton";
import PhotoModal from "./PhotoModal";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../stateManagement/userAtom";

function UserInfo({ setManage, manage }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const navigate = useNavigate();
  const onProfilePhoto = () => {
    setOpen(true);
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box border={"1px solid gray"} borderRadius={1} padding={2}>
      <Box display={"flex"} flexDirection={"row"} mb={3}>
        {user?.image ? (
          <Avatar
            src={user?.image}
            sx={{ width: 50, height: 50, mr: 2, cursor: "pointer" }}
            onClick={onProfilePhoto}
          />
        ) : (
          <Avatar
            sx={{ width: 50, height: 50, mr: 2, cursor: "pointer" }}
            onClick={onProfilePhoto}
          />
        )}

        <Box>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>

          <Typography>{user?.email}</Typography>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"flex-end"}>
        <GreyButton
          text="Manage"
          mr={2}
          onClick={() => setManage(!manage)}
          backgroundColor={manage ? "lightgrey" : "null"}
        />
        <GreyButton text="Sign Out" onClick={signOut} />
      </Box>

      <PhotoModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default UserInfo;
