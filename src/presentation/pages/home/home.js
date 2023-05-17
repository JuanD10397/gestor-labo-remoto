import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../assets/utils/index";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";

import HomeButton from "../../components/HomeButton";

import "./home.scss";

export default function Home() {
  const [jwt] = useLocalState("", "jwt");
  const [userType] = useLocalState("", "userType");
  const [userComplete, setUserComplete] = useState({});

  // Dependiendo de userType hago una petición a API de student o de teacher
  let urlString = "";
  if (userType === "student") urlString = "student/tokenAuth";
  else if (userType === "teacher") urlString = "teacher/tokenAuth";

  // GET COMPLETE USER DATA by jwt
  async function getUserComplete() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      // body: JSON.stringify({ type: userType }),
    };
    const response = await fetch(`${apiUrl}/${urlString}`, config);
    const data = await response.json();
    setUserComplete(data.result[0]);
  }

  // Solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getUserComplete();
  }, []);

  return (
    <Container>
      <h1>Home</h1>
      {userType === "teacher" ? (
        <h2>Bienvenido: {userComplete.tea_name}</h2>
      ) : (
        <h2>Bienvenido: {userComplete.stu_name}</h2>
      )}

      {userType === "teacher" ? (
        <div className="home-container">
          <HomeButton route="/laboratories">
            Mis Laboratorios remotos
          </HomeButton>
          <HomeButton route="/createlabo">Crear Laboratorio</HomeButton>
          <HomeButton route="/horario">Horario</HomeButton>
        </div>
      ) : (
        userType === "student" && (
          <div className="home-container">
            <HomeButton route="/laboratories">Mis Laboratorios</HomeButton>
            <HomeButton route="/passwordlabo">Empezar Laboratorio</HomeButton>
            <HomeButton route="/schedule">Horario</HomeButton>
          </div>
        )
      )}
    </Container>
  );
}
