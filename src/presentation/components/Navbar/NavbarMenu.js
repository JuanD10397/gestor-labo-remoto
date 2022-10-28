import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import LogoUnmsm from "../../../assets/img/unmsm.png";

export default function NavbarMenu() {
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
        <Button variant="success">Ingresar</Button>
      </Container>
    </Navbar>
  );
}
