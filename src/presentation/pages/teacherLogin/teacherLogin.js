import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../../assets/utils/index";

import InputText from "../../components/InputText";
import Container from "../../components/Container";
import MyModal from "../../components/MyModal";

import { logginLoggoutAction } from "../../../domain/actions/loggedActions";
import { useLocalState } from "../../hooks/useLocalState";

export default function TeacherLogin() {
  const [inputs, setInputs] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  // Funciona como useState pero almacena y toma del localStorage
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const navigate = useNavigate(); // para redireccionar

  // Al iniciar sesión redirecciona a patalla de Home
  useEffect(() => {
    if (isLogged && jwt) {
      setIsLogged(false);
      navigate("/home");
      navigate(0); // Esto hace un reload de la página (resuelve un error que tenía al cerrar sesión)
    }
  }, [jwt]);

  // inicializacion dispatch
  // const dispatch = useDispatch();

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
      let data = await res.json();

      console.log("data: ", data);

      if(data.msg){
        setModalDescription("Correo o contraseña incorrectos");
        setShowErrorModal(true);
      }

      if(data.token){
        setJwt(data.token);
        setUserType("teacher");
        setIsLogged(true);
      }

      // dispatch(
      //   logginLoggoutAction({
      //     token: jwt,
      //     type: userType,
      //   })
      // );
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
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            style={{"marginRight": "10px"}}
          >
            Volver
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/teacherRegister")}
          >
            Crear Cuenta
          </Button>
          <Button
            variant="success"
            type="submit"
            style={{float: "right"}}
          >
            Ingresar
          </Button>
        </form>
      </Container>
      <MyModal 
        show={showErrorModal} 
        setShow={setShowErrorModal} 
        title="Error" 
        description={modalDescription}>
      </MyModal>
    </>
  );
}
