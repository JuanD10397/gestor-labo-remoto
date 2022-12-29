import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";

import HomeButton from "../../components/HomeButton";

import "./home.scss";

export default function Home() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  return (
    <Container>
      <h1>Home</h1>
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
