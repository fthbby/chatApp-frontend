import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UserInfo from "./UserInfo";
import ManageAcc from "./ManageAcc";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../stateManagement/userAtom";
import Loading from "../../Loading";

function GeneralSection({ loading, setLoading }) {
  const [manage, setManage] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Box>
      <UserInfo setManage={setManage} manage={manage} />

      {loading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={350}
        >
          <Loading />
        </Box>
      ) : (
        manage && (
          <Box mt={5}>
            <ManageAcc
              setManage={setManage}
              loading={loading}
              setLoading={setLoading}
            />
          </Box>
        )
      )}
    </Box>
  );
}

export default GeneralSection;
