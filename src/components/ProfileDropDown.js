import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsModal from "./settings/SettingsModal";
import { userAtom } from "../stateManagement/userAtom";
import { useRecoilState } from "recoil";

export default function BasicMenu({}) {
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

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user && user !== undefined   ? (
              <Avatar
                sx={{ borderRadius: 25, width: 45, height: 45 }}
                src={user.image}
              />
            ) : (
              <Avatar sx={{ borderRadius: 25, width: 45, height: 45 }}>
                {user?.firstName[0]?.toUpperCase()}
                {user?.lastName[0]?.toUpperCase()}
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
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Box display={"flex"}>
            {user && user !== undefined ? (
              <Avatar
                sx={{ borderRadius: 25, width: 70, height: 70, mr: 2 }}
                src={user?.image}
              />
            ) : (
              <Avatar
                sx={{
                  borderRadius: 25,
                  width: 70,
                  height: 70,
                  fontSize: 30,
                  mr: 2,
                }}
              >
                {user?.firstName[0]?.toUpperCase()}
                {user?.lastName[0]?.toUpperCase()}
              </Avatar>
            )}

            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography color="gray">{user?.email}</Typography>
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
    </div>
  );
}
