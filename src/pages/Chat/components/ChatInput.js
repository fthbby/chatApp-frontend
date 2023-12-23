import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Input, Box } from "@mui/material/";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function ChatInput({ handleSendMessage }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <Box
      display={"grid"}
      alignItems={"center"}
      backgroundColor="#F5F5F5"
      padding={"0 1rem"}
    >
      {/* <div className="button-container"> */}
      {/* <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
        </div> */}
      {/* </div> */}
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <Input
          style={{
            width: "100%",
            background: "white",
            padding: 5,
            borderRadius: 5,
            border: "1.5px solid #E0E0E0",
            marginBottom: 5,
          }}
          disableUnderline
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight:5
          }}
        >
          {/* <IoMdSend fontSize={30} onClick={sendChat} /> */}
          <SendOutlinedIcon onClick={sendChat} sx={{ color: "black" }} />
        </Box>
      </form>
    </Box>
  );
}
