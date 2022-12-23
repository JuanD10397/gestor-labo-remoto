import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import LogoUnmsm from "../../../assets/img/unmsm.png";
import { useLocalState } from "../../hooks/useLocalState";

export default function NavbarMenu() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const logOut = () => {
    setJwt("");
    setUserType("");
  };

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
        <Button variant="success" onClick={logOut}>
          Cerrar sesión
        </Button>
      </Container>
    </Navbar>
  );
}
