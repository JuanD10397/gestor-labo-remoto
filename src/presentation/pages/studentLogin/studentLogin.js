import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import InputText from "../../components/InputText";
import Container from "../../components/Container";

import { logginLoggoutAction } from "../../../domain/actions/loggedActions";

export default function StudentLogin() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      let res = await fetch("http://localhost:9000/student/login", config);
      let json = await res.json();

      console.log("json: ", json);
      const studentToken = json.token;

      dispatch(
        logginLoggoutAction({
          logged: true,
          token: studentToken,
          type: "student",
        })
      );
      console.log("studentToken: ", studentToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Inicio de sesión estudiante</h1>
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
      <Link to="/studentRegister">Crear cuenta</Link>
    </>
  );
}
