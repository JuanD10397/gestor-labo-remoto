import React from "react";
import Container from "../../components/Container";
import HomeButton from "../../components/HomeButton";

import "./start.scss";

export default function Start() {
  return (
    <Container>
      <h1>Inicio de sesión</h1>
      <div className="home-container">
        <HomeButton route="/teacherLogin" imgClass="home-button-teacher">Docente</HomeButton>
        <HomeButton route="/studentLogin" imgClass="home-button-student">Estudiante</HomeButton>
      </div>
      <h1>Registrate</h1>
      <div className="home-container">
        <HomeButton route="/teacherRegister" imgClass="home-button-teacher">Docente</HomeButton>
        <HomeButton route="/studentRegister" imgClass="home-button-student">Estudiante</HomeButton>
      </div>
    </Container>
  );
}
