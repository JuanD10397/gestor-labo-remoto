import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import InputText from "../../components/InputText";
import Container from "../../components/Container";

export default function Login() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    // alert(inputs);
  };

  return (
    <>
      <Container>
        <h1>Inicio de sesión</h1>
        <form onSubmit={handleSubmit}>
          <InputText
            type="email"
            title="Correo"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <InputText
            type="password"
            title="Contraseña"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
          <Button variant="success" type="submit">
            Ingresar
          </Button>
        </form>
      </Container>
    </>
  );
}
