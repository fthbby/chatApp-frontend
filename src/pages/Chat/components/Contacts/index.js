import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ContactsCard from "./ContactsCard";

export default function Contacts({
  contacts,
  // currentUser,
  handleChatChange,
  currentSelected,
  setCurrentSelected,
}) {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [recent, setRecent] = useState(false);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  return (
    <>
      {/* {currentUserName && ( */}
      <Box
        backgroundColor="#fefefc"
        // boxShadow={"0px 2px 5px rgba(0, 0, 0, 0.1)"}
      >
        <Box
          padding={2}
          fontWeight={600}
          display={"flex"}
          justifyContent={"space-between"}
          borderBottom={"1px solid #ABAAAA"}
          mb={1}
        >
          Chat
          <Box>
            <Typography
              display="inline-block"
              fontSize={12}
              mr={2}
              onClick={() => setRecent(true)}
              color={recent ? "#C2C1D6" : "black"}
              borderBottom={recent ? "2px solid #C2C1D6 " : "none"}
              sx={{ cursor: "pointer", pb: 0.5 }}
            >
              Recent
            </Typography>
            <Typography
              display="inline-block"
              fontSize={12}
              onClick={() => setRecent(false)}
              color={recent ? "black" : "#C2C1D6"}
              borderBottom={recent ? "none" : "2px solid #C2C1D6"}
              sx={{ cursor: "pointer", pb: 0.5 }}
            >
              Contacts
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          {recent ? (
            ""
          ) : (
            <>
              {contacts.map((contact, index) => (
                <ContactsCard
                  contact={contact}
                  index={index}
                  changeCurrentChat={changeCurrentChat}
                  currentSelected={currentSelected}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
