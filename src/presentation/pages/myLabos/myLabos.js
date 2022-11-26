import React from "react";
import { Container } from "react-bootstrap";
import LogoUnmsm from "../../../assets/img/unmsm.png";

import LaboCard from "../../components/LaboCard/LaboCard";

export default function MyLabos() {
  return (
    <Container>
      <h1>Mis Laboratorios</h1>
      <LaboCard laboImg={LogoUnmsm}></LaboCard>
    </Container>
  );
}
