import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { allUsersRoute, host } from "../../api/routes";
import Welcome from "../../components/Welcome";
import ChatContainer from "./components/ChatContainer";
import Header from "./components/Header";
import Contacts from "../Chat/components/Contacts";
import CustomLayout from "../../layouts/CustomLayout";
import PhotoModal from "../../components/settings/GeneralSection/PhotoModal";
import Loading from "../../components/Loading";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const getAllContacts = async () => {
    try {
      if (currentUser) {
        setLoading(true);
        let res = await axios.get(allUsersRoute);
        console.log("get all users res :", res.data.data);
        if (res.data.success) {
          setLoading(false);
          setContacts(res?.data.data);
        }
        setLoading(false);
      } else console.log("no current user so cant pull contacts");
    } catch (err) {}
  };

  const checkLoggedInUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      console.log("no logged in user");
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
      console.log("current loged in user:", currentUser);
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  useEffect(() => {
    getAllContacts();
  }, [currentUser]);

  const [photoModal, setPhotoModal] = useState(true);

  return (
    <CustomLayout>
      {/* <PhotoModal open={photoModal} onClose={()=>setPhotoModal(false)} user={currentUser}/> */}
      <Box
        height={"100vh"}
        width={"100vw"}
        display="flex"
        // flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        // gap={"1rem"}
        backgroundColor="black"
      >
        <Box backgroundColor="#F5F5F5">
          <Header
            currentChat={currentChat}
            currentUser={currentUser}
            contacts={contacts}
            handleChatChange={handleChatChange}
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
          />
          <Box
            display="grid"
            gridTemplateColumns={"30% 70%"}
            height={"85vh"}
            width={"85vh"}
          >
            <Contacts
              loading={loading}
              contacts={contacts}
              currentUser={currentUser}
              handleChatChange={handleChatChange}
              currentSelected={currentSelected}
              setCurrentSelected={setCurrentSelected}
              setCurrentChat={setCurrentChat}
            />

            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : currentChat === "new" ? (
              "new chat container here"
            ) : (
              <ChatContainer
                loading={loading}
                setLoading={setLoading}
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </Box>
        </Box>
      </Box>
    </CustomLayout>
  );
}

//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-columns: 35% 65%;
