import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import InputText from "../../components/InputText";
import Container from "../../components/Container";

import { logginLoggoutAction } from "../../../domain/actions/loggedActions";

export default function TeacherLogin() {
  const [inputs, setInputs] = useState({});
  //const [userLogged, setUserLogged] = useState({ logged: false, token: "" });

  // inicializacion dispatch
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

      let res = await fetch("http://localhost:9000/teacher/login", config);
      let json = await res.json();

      console.log("json: ", json);
      // const teacherToken = json[Object.keys(json)[1]];
      const teacherToken = json.token;

      //setUserLogged({ logged: true, token: teacherToken });
      dispatch(
        logginLoggoutAction({
          logged: true,
          token: teacherToken,
          type: "teacher",
        })
      );
      console.log("teacherToken: ", teacherToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Inicio de sesión docente</h1>
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
      <Link to="/teacherRegister">Crear cuenta</Link>
    </>
  );
}
