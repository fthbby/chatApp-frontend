import { useState, useEffect } from "react";
import styled from "styled-components";
// import TeamsLogo from "../assets/TeamsLogo.png";
import { Box, Typography } from "@mui/material";
import ContactsCard from "./ContactsCard";

export default function Contacts({
  contacts,
  currentUser,
  handleChatChange,
  currentSelected,
  setCurrentSelected,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const [recent, setRecent] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  console.log("contacts :", contacts);
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
          borderBottom={'1px solid #ABAAAA'}
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

const Container = styled.div`
  ${"" /* display: grid; */}
  ${"" /* gird-template-rows: 10% 75% 15%; */}
  ${"" /* overflow: hidden; */}
  ${"" /* background-color: #fefefc; */}

  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: red;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
