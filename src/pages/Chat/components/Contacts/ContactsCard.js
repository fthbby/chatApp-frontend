import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

function ContactsCard({ contact, index, changeCurrentChat, currentSelected }) {
  return (
    <Box
      sx={{ cursor: "pointer" }}
      // minHeight={"5rem"}
      width={"90%"}
      borderRadius={"0.2rem"}
      padding={"0.4rem"}
      gap={"1rem"}
      alignItems={"center"}
      display={"flex"}
      transition={"0.5s ease-in-out"}
      key={contact?._id}
      backgroundColor={`${index === currentSelected ? "#ECEBE7" : ""}`}
      onClick={() => changeCurrentChat(index, contact)}
    >
      {contact?.image?.length > 0 ? (
        <Avatar src={contact?.image} />
      ) : (
        <Avatar>
          {contact?.firstName[0].toUpperCase()}
          {contact?.lastName[0].toUpperCase()}
        </Avatar>
      )}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <h5>
            {contact?.firstName} {""}
            {contact?.lastName ? contact?.lastName[0] : ""}
          </h5>
          <Typography fontSize={12}>Hi</Typography>
        </Box>

        <Typography fontSize={12}>11/2</Typography>
      </Box>
    </Box>
  );
}

export default ContactsCard;
