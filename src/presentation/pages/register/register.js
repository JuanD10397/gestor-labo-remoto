import React from "react";

import InputText from "../../components/InputText";
import Container from "../../components/Container";

export default function Register() {
  return (
    <>
      <h1>Register</h1>
      <Container>
        <InputText title="Nombres" />
        <InputText title="Apellidos" />
        <InputText title="Correo" />
      </Container>
    </>
  );
}
