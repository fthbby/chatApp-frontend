import { useState } from "react";
import styled from "styled-components";
import TeamsLogo from "../../../assets/TeamsLogo.png";
import { Autocomplete, TextField, Box, Grid, Typography } from "@mui/material/";
import ProfileDropDown from "../../../components/ProfileDropDown";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../stateManagement/userAtom";

export default function Header({
  currentUser,
  contacts=[],
  handleChatChange,
  setCurrentSelected,
}) {
  const [focus, setFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [user, setUser] = useRecoilState(userAtom);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  const filteredContacts = contacts?.filter((data) => data._id !== user._id);

  return (
    <Container>
      <Grid
        container
        display="flex"
        justifyContent={"space-between"}
        padding={"0 2rem"}
      >
        <Grid
          item
          xs={2}
          md={2}
          display="flex"
          alignItems={"center"}
          gap={"1rem"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              height: "5rem",
            }}
          >
            <Box component="img" src={TeamsLogo} alt="logo" height={"2rem"} />
            <Typography color='white' fontSize={14}>TeamsClone</Typography>
          </Box>
        </Grid>
        <Grid item xs={7} md={7}>
          <Autocomplete
            value={selectedValue}
            onChange={(event, value) => {
              if (value) {
                const selectedIndex = contacts.findIndex(
                  (contact) => contact.username === value.username
                );
                changeCurrentChat(selectedIndex, value);
              }
            }}
            sx={{ marginTop: 2.5 }}
            options={filteredContacts}
            getOptionLabel={(option) =>
              option?.firstName + " " + option?.lastName
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={{
                  backgroundColor: "white",
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#dadae9",
                  },
                  // "& .MuiInput-underline:hover:before": {
                  //   borderBottomColor: "white",
                  // },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "white", // Color when focused, change this to your desired color
                  },
                }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disableUnderline
                placeholder={focus ? "Search for people and chats" : "Search"}
                className={focus ? "focusInput" : "input"}
                // startAdornment={
                //   <InputAdornment position="start">
                //     {!focus && <SearchIcon />}
                //   </InputAdornment>
                // }
              />
            )}
            clearOnBlur
            clearOnEscape
          />
        </Grid>

        <Grid item md={1} display={"flex"} alignItems={"center"}>
          <ProfileDropDown />
        </Grid>
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  background-color: #454791;
  width: 100%;
  .input {
    border: 1px solid #e6e9eb;
    height: 40px;
    ${"" /* width: 400px; */}
    border-radius: 5px;
    ${"" /* padding-top: 12px; */}
    padding-top: 6px;

    padding-bottom: 12px;
    padding-right: 16px;
    padding-left: 16px;
    background-color: #dadae9;
  }
  .focusInput {
    border: 1px solid #e6e9eb;
    height: 40px;
    ${"" /* width: 400px; */}
    border-radius: 5px;
    padding-top: 6px;

    ${"" /* padding-top: 12px; */}
    padding-bottom: 12px;
    padding-right: 16px;
    padding-left: 16px;
    background-color: white;
  }
`;
