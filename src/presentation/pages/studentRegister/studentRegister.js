import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import InputText from "../../components/InputText";
import Container from "../../components/Container";
import MyModal from "../../components/MyModal";
import { apiUrl } from "../../../assets/utils/index";

// import { logginLoggoutAction } from "../../../domain/actions/loggedActions";
// import { useDispatch } from "react-redux";

export default function StudentRegister() {
  const [inputs, setInputs] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  const navigate = useNavigate(); // para redireccionar

  useEffect(() => {
    if (registerSuccess) {
      setRegisterSuccess(false);
      navigate("/studentLogin");
    }
  }, [registerSuccess]);

  // // inicializacion dispatch
  // const dispatch = useDispatch();
  // const logginUser = (state) => dispatch(logginLoggoutAction(state));

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

      let res = await fetch(`${apiUrl}/student`, config);
      let data = await res.json();

      console.log("data: ", data);

      if(data?.msg?.code == "ER_DUP_ENTRY"){
        setModalDescription("El correo ya está registrado en el sistema");
        setShowErrorModal(true);
      }
      else if(data.errors){
        setModalDescription(
          "La contraseña debe tener 8 o más caracteres e incluír al menos una minúscula, una mayúscula y un número");
        setShowErrorModal(true);
      }
      else{
        // const studentToken = data[Object.keys(data)[0]];
        setRegisterSuccess(true);
      }
      // dispatch(logginLoggoutAction({ logged: true, token: studentToken }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Registro de estudiante</h1>
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
