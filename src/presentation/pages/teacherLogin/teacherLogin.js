import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../../assets/utils/index";

import InputText from "../../components/InputText";
import Container from "../../components/Container";

import { logginLoggoutAction } from "../../../domain/actions/loggedActions";
import { useLocalState } from "../../hooks/useLocalState";

export default function TeacherLogin() {
  const [inputs, setInputs] = useState({});

  // Funciona como useState pero almacena y toma del localStorage
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const navigate = useNavigate();

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

      let res = await fetch(`${apiUrl}/teacher/login`, config);
      let json = await res.json();

      console.log("json: ", json);
      setJwt(json.token);
      setUserType("teacher");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jwt) {
      console.log("jwt: ", jwt);
      dispatch(
        logginLoggoutAction({
          token: jwt,
          type: userType,
        })
      );
    }
  }, [jwt]);

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
          <Button
            variant="success"
            type="submit"
            // onClick={() => navigate("/home")}
          >
            Ingresar
          </Button>
        </form>
      </Container>
      <Link to="/teacherRegister">Crear cuenta</Link>
    </>
  );
}
