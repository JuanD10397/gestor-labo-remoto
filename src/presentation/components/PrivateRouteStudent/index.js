import React from "react";
import { useLocalState } from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRouteStudent = ({ children }) => {
  //const jwt = useSelector((state) => state.logged);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  return jwt && userType === "student" ? children : <Navigate to="/" />;
};

export default PrivateRouteStudent;
