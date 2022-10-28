import React from "react";
import { Link } from "react-router-dom";

import HomeButton from "../../components/HomeButton";

import "./home.scss";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <div className="home-container">
        <HomeButton route="/register">Mis Laboratorios remotos</HomeButton>
        <HomeButton route="/register">Empezar laboratorio</HomeButton>
        <HomeButton route="/register">Horario</HomeButton>
      </div>

      <Link to="/register">Registrarse</Link>
    </>
  );
}
