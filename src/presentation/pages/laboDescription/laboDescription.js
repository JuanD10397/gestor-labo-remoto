import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function LaboDescription() {
  const { laboId } = useParams();
  console.log(laboId);

  return (
    <Container>
      <h1>Description Labo</h1>
      <div>Labo numero {laboId}</div>
      <Button variant="primary">Inscribirme</Button>
    </Container>
  );
}
