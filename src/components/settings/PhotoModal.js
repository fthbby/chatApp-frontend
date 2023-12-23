import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import GreyButton from "../buttons/GreyButton";

function PhotoModal({ open, onClose }) {
  const [isActive, setIsActive] = useState("General");

  return (
    <Modal open={open} onClose={onClose}>
      <Box style={styles} backgroundColor="white" borderRadius={1} padding={2.5} display='flex' justifyContent={'space-between'} flexDirection={'column'}>
        <Box display={"flex"} justifyContent={"space-between"} >
          <Typography id="modal-modal-title" variant="h6">
            Change your profile picture
          </Typography>
          {/* <CloseIcon
            onClick={onClose}
            sx={{ cursor: "pointer", color: "gray" }}
          /> */}
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography>Upload Picture</Typography>
            <Typography>Remove Picture</Typography>
          </Box>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Box>

        <Box
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <GreyButton text="Close" mr={3} onClick={onClose}/>
          <GreyButton text="Save" />
        </Box>
      </Box>
    </Modal>
  );
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 330,
  minHeight: 300,
  boxShadow: 24,
  p: 4,
};

export default PhotoModal;
