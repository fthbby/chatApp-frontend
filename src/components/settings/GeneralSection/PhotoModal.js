import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Avatar } from "@mui/material";
import GreyButton from "../../buttons/GreyButton";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../stateManagement/userAtom";
import { removeAvatar } from "../../../api/routes";
import axios from "axios";

function PhotoModal({ open, onClose }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [image, setImage] = useState();

  const closeModal = () => {
    setImage(null);
    onClose();
  };
  
  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64 encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error :", error);
    };
  };

  const uploadImage = (e) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/image`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
        email: user.email,
        id: user._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        console.log("Before update:", user);
        setUser({
          ...user,
          image: data.image,
          isAvatarImageSet: data.isAvatarImageSet,
        });

        if (data.success) {
          closeModal();
        }
      });
  };

  const deleteAvatar = async () => {
    try {
      let res = await axios.put(removeAvatar, {
        id: user._id,
      });

      if (res.data.success) {
        setUser({
          ...user,
          image: res.data.image,
          isAvatarImageSet: res.data.isAvatarImageSet,
        });
        closeModal();
      }
    } catch (err) {
      console.log("err :", err);
    }
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        style={styles}
        backgroundColor="white"
        borderRadius={1}
        padding={2.5}
        display="flex"
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography id="modal-modal-title" variant="h6">
            Change your profile picture
          </Typography>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography sx={{ cursor: "pointer" }} component="label">
              Upload Picture
              <input
                type="file"
                accept="image/"
                onChange={convertToBase64}
                hidden
              />
            </Typography>

            <Typography onClick={deleteAvatar} sx={{ cursor: "pointer" }}>
              Remove Picture
            </Typography>
          </Box>
          {user && user?.image ? (
            <Avatar sx={{ width: 100, height: 100 }} src={user.image} />
          ) : image != null ? (
            <Avatar sx={{ width: 100, height: 100 }} src={image} />
          ) : (
            <Avatar sx={{ width: 100, height: 100 }} />
          )}
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <GreyButton text="Close" mr={3} onClick={closeModal} />
          <GreyButton text="Save" onClick={uploadImage} />
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
