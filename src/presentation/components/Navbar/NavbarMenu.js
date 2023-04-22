import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import LogoUnmsm from "../../../assets/img/unmsm.png";
import { useLocalState } from "../../hooks/useLocalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarMenu() {
  // Guardar datos en el localStorage y a la vez crear como un useState
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const navigate = useNavigate(); // para redireccionar

  // Cierre de sesión
  const logOut = () => {
    setJwt("");
    setUserType("");
  };

  // Redirecciona a patalla de inicio al cerrar sesión
  useEffect(() => {
    if (!jwt && !userType) {
      navigate("/");
    }
  }, [jwt, userType]);

  return (
    <Navbar style={{ background: "#0d6efd" }}>
      <Container>
        <Navbar.Brand>
          <img
            alt="Gestor Labo Remoto"
            src={LogoUnmsm}
            width="50"
            height="70"
            className="d-inline-block align-top mr-4"
          />
        </Navbar.Brand>
        <h2 style={{ color: "white" }}>Laboratorios Remotos UNMSM</h2>
        {jwt && (
          <Button variant="success" onClick={logOut}>
            Cerrar sesión
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
