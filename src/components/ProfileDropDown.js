import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  ListItemIcon,
  Grid,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsModal from "./settings/SettingsModal";
import { userAtom } from "../stateManagement/userAtom";
import { useRecoilState } from "recoil";

export default function BasicMenu({ currentUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const handleLogOut = async () => {
    await localStorage.clear();
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onManageAccount = () => {
    handleClose();
    setOpenModal(true);
  };
  return (
    <div>
      <SettingsModal open={openModal} onClose={() => setOpenModal(false)} />

      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {user.image ? (
                <Avatar
                  sx={{ borderRadius: 25, width: 45, height: 45 }}
                  src={user.image}
                />
              ) : (
                <Avatar sx={{ borderRadius: 25, width: 45, height: 45 }}>
                  {currentUser?.firstName[0].toUpperCase()}
                  {currentUser?.lastName[0].toUpperCase()}
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          // PaperProps={{
          //   elevation: 0,
          //   sx: {
          //     overflow: "visible",
          //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          //     mt: 1.5,
          //     "& .MuiAvatar-root": {
          //       width: 32,
          //       height: 32,
          //       ml: -0.5,
          //       mr: 1,
          //     },
          //     "&:before": {
          //       content: '""',
          //       display: "block",
          //       position: "absolute",
          //       top: 0,
          //       right: 14,
          //       width: 10,
          //       height: 10,
          //       bgcolor: "background.paper",
          //       transform: "translateY(-50%) rotate(45deg)",
          //       zIndex: 0,
          //     },
          //   },
          // }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Box display={"flex"}>
              {/* <Avatar style={{ width: 75, height: 75 }} /> */}
              {user.image ? (
                <Avatar
                  sx={{ borderRadius: 25, width: 75, height: 75 }}
                  src={user.image}
                />
              ) : (
                <Avatar sx={{ borderRadius: 25, width: 75, height: 75 }}>
                  {currentUser?.firstName[0].toUpperCase()}
                  {currentUser?.lastName[0].toUpperCase()}
                </Avatar>
              )}

              <Box display="flex" flexDirection={"column"}>
                <Typography>{currentUser?.username}</Typography>
                <Typography color="gray">{currentUser?.email}</Typography>
                <Typography>Available</Typography>
              </Box>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem onClick={onManageAccount}>
            <ListItemIcon>
              <ContactMailIcon fontSize="small" />
            </ListItemIcon>
            Manage Account
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>{/* <Logout fontSize="small" /> */}</ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </>
    </div>
  );
}
