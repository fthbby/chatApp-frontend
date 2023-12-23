import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import GeneralSection from "./GeneralSection";

function SettingsModal({ open, onClose }) {
  const [isActive, setIsActive] = useState("General");

  const navItems = [
    { title: "General", icon: <SettingsIcon sx={{ mr: 1, color: "gray" }} /> },
    {
      title: "Accounts",
      icon: <ContactMailIcon sx={{ mr: 1, color: "gray" }} />,
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box style={styles} backgroundColor="white" borderRadius={1} padding={2}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography id="modal-modal-title" variant="h6">
            Settings
          </Typography>
          <CloseIcon
            onClick={onClose}
            sx={{ cursor: "pointer", color: "gray" }}
          />
        </Box>

        <Grid container mt={2}>
          <Grid item xs={4} md={4} display={"flex"} flexDirection={"column"}>
            {navItems.map((x) => (
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => setIsActive(x.title)}
                backgroundColor={x.title == isActive ? "#EBEBEB" : ""}
                sx={{
                  padding: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  transition: " background 0.3s ease-in-out",
                  "&:hover": {
                    background: "#EBEBEB",
                  },
                }}
              >
                {x.icon} {x.title}
              </Box>
            ))}
          </Grid>

          <Grid item md={0.5} xs={0.5} />
          <Grid item md={7} xs={7}>
            {isActive == "General" && (
              <>
                <GeneralSection />
              </>
            )}

            {isActive == "Accounts" && <>Accounts</>}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  minHeight: 600,
  boxShadow: 24,
  p: 4,
};

export default SettingsModal;
