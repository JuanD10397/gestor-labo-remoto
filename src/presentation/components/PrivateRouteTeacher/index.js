import React from "react";
import { useLocalState } from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRouteTeacher = ({ children }) => {
  //const jwt = useSelector((state) => state.logged);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  return jwt && userType === "teacher" ? children : <Navigate to="/" />;
};

export default PrivateRouteTeacher;
