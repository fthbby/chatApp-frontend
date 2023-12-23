import { Box, Typography } from "@mui/material/";
import Welcome from "../assets/Welcome.png";

export default function Main({ currentUser }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box component={"img"} src={Welcome} alt="welcome" height={"20rem"} />
      <Box display={"flex"} flexDirection={"row"}>
        <Typography variant="h4">Welcome,</Typography>
        <Typography variant='h4' color="purple"> {currentUser?.username}!</Typography>
      </Box>

      <h3>Please select a chat to start messaging :)</h3>
    </Box>
  );
}
