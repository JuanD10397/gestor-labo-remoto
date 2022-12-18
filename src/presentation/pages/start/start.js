import React from "react";
import Container from "../../components/Container";
import HomeButton from "../../components/HomeButton";

// import "./home.scss";

export default function Start() {
  return (
    <Container>
      <h1>Inicio de sesión</h1>
      <div className="home-container">
        <HomeButton route="/teacherLogin">Docente</HomeButton>
        <HomeButton route="/studentLogin">Estudiante</HomeButton>
      </div>
    </Container>
  );
}
