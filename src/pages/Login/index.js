import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute } from "../../api/routes";
import Loading from "../../components/Loading";
import CustomInput from "../../components/inputs/CustomInput";
import { Button, InputAdornment, Typography, IconButton } from "@mui/material";
import TeamsLogo from "../../components/TeamsLogo";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordInput from "../../components/inputs/PasswordInput";
import PurpleButton from "../../components/buttons/PurpleButton";
import { useRecoilState } from "recoil";
import {userAtom} from '../../stateManagement/userAtom'

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useRecoilState(userAtom)
  const handleClickPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [values, setValues] = useState({
    // username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const toastStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "light",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      console.log("in validation", loginRoute);
      const { password, email } = values;

      const { data } = await axios.post(loginRoute, { email, password });

      if (data.status === false) {
        toast.error(data.msg, toastStyle);
        setLoading(false);
      }
      if (data.status === true) {
        setLoading(false);
        setUser(data.user)
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username, email } = values;
    if (email.length === "" || password.length === "") {
      toast.error("Email & PW is required", toastStyle);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={(event) => handleSubmit(event)}>
            <TeamsLogo />

            <CustomInput
              name="email"
              placeholder="email"
              onChange={(e) => handleChange(e)}
            />

            <PasswordInput
              type={"password"}
              name="password"
              placeholder="password"
              onChange={(e) => handleChange(e)}
              handleClickPassword={handleClickPassword}
              showPassword={showPassword}
            />
            <PurpleButton onClick={handleSubmit} text="Login" />

            <Typography textTransform={"uppercase"} textDecoration="none">
              Don't have an account??{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Register
              </Link>
            </Typography>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #5558ae;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f0f0f0;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      padding: 1rem;
    }

    ${
      "" /* button {
      background-color: #5558ae;
      height: 50px;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      transition: 0.5s ease-in-out;
      &: hover {
        background-color: black;
      }
    } */
    }
  }
`;

export default Login;
