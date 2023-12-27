import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../api/routes";
import CustomInput from "../components/inputs/CustomInput";
import Loading from "../components/Loading";
import TeamsLogo from "../components/TeamsLogo";
import CustomLayout from "../layouts/CustomLayout";
import PurpleButton from "../components/buttons/PurpleButton";
import PasswordInput from "../components/inputs/PasswordInput";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    console.log("VALUES :", values);
  }, [values]);

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

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
      console.log("in validation", registerRoute);
      const { password, email, lastName, firstName, confirmPassword } = values;
      console.log("vaues :", values);
      const { data } = await axios.post(registerRoute, {
        // username,
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      });

      console.log("data :", data);

      if (data.status === false) {
        setLoading(false);

        toast.error(data.msg, toastStyle);
      }
      if (data.status === true) {
        setLoading(false);

        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, firstName, lastName } = values;
    if (password !== confirmPassword) {
      toast.error("PW & CF should be da same", toastStyle);
      return false;
      // } else if (username.length < 3) {
      //   toast.error("Username shoudl be longer than 3 characters", toastStyle);
      //   return false;
    } else if (password.length < 5) {
      toast.error("password shoudl be longer than 5 characters", toastStyle);
      return false;
    } else if (email === "") {
      toast.error("email can't be blank", toastStyle);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <CustomLayout>
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={(event) => handleSubmit(event)}>
            <TeamsLogo />
            {/* <CustomInput
              placeholder="UserName"
              name="username"
              onChange={(e) => handleChange(e)}
            /> */}
            <CustomInput
              placeholder="First Name"
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
            <CustomInput
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
            <CustomInput
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              handleClickPassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <PasswordInput
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              handleClickPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              showPassword={showConfirmPassword}
            />

            <PurpleButton onClick={handleSubmit} text="Create user" />
            <Typography textTransform={"uppercase"} textDecoration="none">
              Already have an account ??{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Login
              </Link>
            </Typography>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </CustomLayout>
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
      background-color: transparent;
      padding: 1rem;
      ${'' /* border: 0.1rem solid #5558ae; */}
      border-radius: 0.4rem;

      &:focus: {
        border: 1 rem solid red;
        ${"" /* outline:none */}
      }
    }
    button {
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
    }
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #5558ae;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
