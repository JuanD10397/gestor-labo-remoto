import React, { useState } from "react";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";
import Container from "../../../../components/Container";
import InputText from "../../../../components/InputText";
import MyModal from "../../../../components/MyModal";
import { Button } from "react-bootstrap";

export default function AddStudentToLabo(props) {
  const { laboId } = props;
  console.log("laboId: ", laboId);

  const [jwt] = useLocalState("", "jwt");
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Agregar estudiante")
  const [modalDescription, setModalDescription] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // Esta línea de setInputs agrega el laboId a inputs. Eso es lo que debo enviar en el body al API
    setInputs((values) => ({ ...values, labId: laboId }));
  };

  console.log("inputs: ", inputs);

  // DOCENTE AñADE ESTUDIANTE A LABORATORIO
  const handleSubmitAddStudent = async (event) => {
    event.preventDefault();

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(inputs),
      };

      let res = await fetch(`${apiUrl}/teacher/addstudent`, config);
      let json = await res.json();

      console.log("json: ", json);

      if(json.msg.code == "ER_DUP_ENTRY"){
        setTitleModal("Error")
        setModalDescription("Estudiante ya está agregado al laboratorio");
        setShowModal(true);
      }
      else if(json.msg == "Student email not found"){
        setTitleModal("Error")
        setModalDescription("Correo de estudiante no registrado en el sistema");
        setShowModal(true);
      }
      else {
        setTitleModal("Agregar estudiante")
        setModalDescription("Estudiante agregado correctamente");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Estudiantes Matriculados</h1>
        <div>Acá iría una tabla de los estudiantes (apellidos, correos, si tienen cuenta o no, su horario registrado)</div>
      </Container>
      <MyModal 
        show={showModal} 
        setShow={setShowModal} 
        title={titleModal}
        description={modalDescription}
      />
    </>
  );
}
