import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import CustomTextField from "../../inputs/CustomTextField";
import GreyButton from "../../buttons/GreyButton";
import { userAtom } from "../../../stateManagement/userAtom";
import { updateUser } from "../../../api/routes";
import axios from "axios";

function ManageAcc({ setManage, loading, setLoading }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [profile, setProfile] = useState(user);

  const handleProfile = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let id = profile._id;

      let res = await axios.put(updateUser, {
        id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });

      if (res.data.success) {
        setLoading(false);
        setUser({
          ...user,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        });

        setManage(false);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box border={"1px solid gray"} borderRadius={1} padding={2}>
      <CustomTextField
        title="First Name"
        name="firstName"
        value={user?.firstName}
        handleProfile={handleProfile}
        profile={profile}
      />
      <CustomTextField
        title="Last Name"
        name="lastName"
        value={user.lastName}
        handleProfile={handleProfile}
        profile={profile}
      />
      <CustomTextField
        title="Email"
        name="email"
        value={user.email}
        handleProfile={handleProfile}
        profile={profile}
      />

      <Box pt={5} display={"flex"} justifyContent={"flex-end"}>
        <GreyButton text="Save" mr={3} onClick={handleSubmit} />
        <GreyButton text="Cancel" onClick={() => setManage(false)} />
      </Box>
    </Box>
  );
}

export default ManageAcc;
