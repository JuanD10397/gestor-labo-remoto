import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../assets/utils/index";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";
import Spinner from "react-bootstrap/Spinner";

import HomeButton from "../../components/HomeButton";

import "./home.scss";

export default function Home() {
  const [jwt] = useLocalState("", "jwt");
  const [userType] = useLocalState("", "userType");
  const [userComplete, setUserComplete] = useState({});
  const [loading, setLoading] = useState(true);

  // Dependiendo de userType hago petición a API de student o de teacher
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
    setLoading(false);
  }

  // Solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getUserComplete();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{display:"flex", justifyContent:"center", marginTop: "20px"}}>
          <Spinner animation="border" variant="primary"/>
        </div>
      ) : (
        <Container>
          <h1>Home</h1>
          {userType === "teacher" ? (
            <h2>Bienvenido: {userComplete.tea_name}</h2>
          ) : (
            <h2>Bienvenido: {userComplete.stu_name}</h2>
          )}

          {userType === "teacher" ? (
            <div className="home-container">
              <HomeButton route="/laboratories" imgClass="home-button-lab">
                Mis Laboratorios remotos
                </HomeButton>
              <HomeButton route="/createlabo" imgClass="home-button-add">
                Crear Laboratorio
                </HomeButton>
              <HomeButton route="/horario" imgClass="home-button-schedules">
                Horario
                </HomeButton>
            </div>
          ) : (
            userType === "student" && (
              <div className="home-container">
                <HomeButton route="/laboratories" imgClass="home-button-lab">
                  Mis Laboratorios
                  </HomeButton>
                <HomeButton route="/passwordlabo" imgClass="home-button-start">
                  Empezar Laboratorio
                  </HomeButton>
                <a href="https://rustdesk.com/">
                  <div className={"home-button-redirect"}>Descarga Rustdesk</div>
                </a>
   
              </div>
            )
          )}
        </Container>
      )}
    </>
  );
}
