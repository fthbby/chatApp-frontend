import axios from "axios";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Box } from "@mui/material";
import OtherUserHeader from "./OtherUserHeader";
import { getAllMessageRoute, sendMessageRoute } from "../../../api/routes";
import ChatInput from "./ChatInput";
import Loading from "../../../components/Loading";
import Bubble from "./Bubble";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  const formatDate = (message) => {
    return dayjs(message).format("MM/DD/YYYY hh:mma");
  };
  
  const handleSendMessage = async (msg) => {
    try {
      let res = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      console.log("res :", res);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAllMessages = async () => {
    if (currentChat) {
      setLoading(true);
      let res = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        createdAt: currentChat.createdAt,
      });

      setMessages(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  return (
    <>
      <Box
        display={"grid"}
        gridTemplateRows={"10% 75% 15%"}
        overflow={"hidden"}
        boxShadow={"0px 0px 8px rgba(0, 0, 0, 0.2)"}
      >
        <OtherUserHeader currentChat={currentChat} />

        {loading ? (
          <Box
            height={"100%"}
            width={"100%"}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Loading />
          </Box>
        ) : (
          <Box
            padding={"2rem 2rem"}
            display="flex"
            flexDirection={"column"}
            gap={"1rem"}
            overflow={"auto"}
          >
            {messages.map((message, index) => {
              return (
                <Box
                  ref={scrollRef}
                  key={uuidv4}
                  display={!message.fromSelf && "flex"}
                  flexDirection={!message.fromSelf && "row"}
                  alignItems={"center"}
                >
                  {!message.fromSelf && (
                    <Avatar
                      sx={{ marginRight: 2 }}
                      src={currentChat.image ? currentChat.image : ""}
                    />
                  )}
                  <Box
                    style={message.fromSelf ? styles.sended : styles.received}
                  >
                    <Bubble
                      message={message}
                      currentChat={currentChat}
                      formatDate={formatDate}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        <ChatInput handleSendMessage={handleSendMessage} />
      </Box>
    </>
  );
}

const styles = {
  sended: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  received: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  sentBubble: {
    borderRadius: 5,
    backgroundColor: "#e5e5f1",
  },

  receivedBubble: {
    borderRadius: 5,
    backgroundColor: "white",
  },
};
