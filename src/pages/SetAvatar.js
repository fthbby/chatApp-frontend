import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/TeamsLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute, setAvatarRoute } from "../api/routes";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//   useEffect(async () => {
//     if (!localStorage.getItem("chat-app-user"))
//       navigate("/login");
//   }, []);

  const toastStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "light",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select an avatar ", toastStyle);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("error setting avatar", toastStyle);
      }
    }
  };

  const grabPhotos = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        "https://api.multiavatar.com/Starcrasher.png"
      );
      // const buffer = new Buffer(image.data);
      // data.push(buffer.toString("base64"));
      data.push(image);
      console.log("image :", image);
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    grabPhotos();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          Loading....
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile pic</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #5558ae;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
