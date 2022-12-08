import React from "react";
import { Button } from "react-bootstrap";
import Container from "../../components/Container";

export default function Schedule() {
  return (
    <Container>
      <h1>Reserva de horario</h1>
      <label>Fecha: </label>
      <input type="date" id="laboDate" name="laboDate" />
      <label>Hora de inicio: </label>
      <input type="time" id="startTime" name="startTime" />
      <Button variant="success">Registrar</Button>
    </Container>
  );
}
