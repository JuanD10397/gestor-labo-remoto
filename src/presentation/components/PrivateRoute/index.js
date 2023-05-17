import React from "react";
import { useLocalState } from "../../hooks/useLocalState";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //const jwt = useSelector((state) => state.logged);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  return !jwt ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
