import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { apiUrl } from "../../../assets/utils/index";

import InputText from "../../components/InputText";
import Container from "../../components/Container";
import useFetch from "../../hooks/useFetch";

export default function TeacherRegister() {
  const [inputs, setInputs] = useState({});

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

      let res = await fetch(`${apiUrl}/teacher/login`, config);
      let json = await res.json();

      console.log("json: ", json);
      // const teacherToken = json[Object.keys(json)[0]];

      // console.log(teacherToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Registro de docente</h1>
        <form onSubmit={handleSubmit}>
          <InputText
            type="text"
            title="Nombres"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
          <InputText
            type="text"
            title="Apellidos"
            name="lastname"
            value={inputs.lastname || ""}
            onChange={handleChange}
          />
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
            Registrar
          </Button>
        </form>
        {/* <Button onClick={estado}>Estado</Button>
        <Button onClick={updateLoggin}>Log</Button> */}
      </Container>
    </>
  );
}
