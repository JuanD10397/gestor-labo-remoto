import React, { useState } from "react";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";
import Container from "../../../../components/Container";
import MyModal from "../../../../components/MyModal";
import { Button } from "react-bootstrap";
import TextArea from "../../../../components/TextArea/TextArea";

export default function AddStudentToLabo(props) {
  const { laboId } = props;
  // console.log("laboId: ", laboId);

  const [jwt] = useLocalState("", "jwt");
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Agregar estudiante");
  const [modalDescription, setModalDescription] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // Esta línea de setInputs agrega el laboId a inputs. Eso es lo que debo enviar en el body al API
    setInputs((values) => ({ ...values, labId: laboId }));
  };

  // console.log("inputs: ", inputs);

  // DOCENTE AñADE ESTUDIANTE A LABORATORIO
  const handleSubmitAddStudent = async (event) => {
    event.preventDefault();

    console.log("inputs: ", inputs);
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

      const getRepeatedEmail = () => {
        return json.msg.sqlMessage.split("'")[1].split("-")[1];
      };

      if (json.msg.code === "ER_DUP_ENTRY") {
        const repeatedEmail = getRepeatedEmail();
        setTitleModal("Error");
        setModalDescription(
          `${repeatedEmail} ya está agregado al laboratorio. Borra su correo y vuelve a intentar`
        );
        setShowModal(true);
      }
      // else if(json.msg == "Student email not found"){
      //   setTitleModal("Error")
      //   setModalDescription("Correo de estudiante no registrado en el sistema");
      //   setShowModal(true);
      // }
      else {
        setTitleModal("Agregar estudiantes");
        setModalDescription("Estudiantes agregados correctamente");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
  };

  return (
    <>
      <Container>
        <h1>Agregar estudiantes</h1>
        <h5>Agregar varios</h5>
        <form onSubmit={handleSubmitAddStudent}>
          <TextArea
            id="email"
            type="email"
            title="Correos"
            rows={5}
            name="emailStudent"
            value={inputs.emailStudent || ""}
            onChange={handleChange}
          />
          <Button variant="success" type="submit">
            Agregar
          </Button>{" "}
        </form>
      </Container>
      <MyModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        description={modalDescription}
        handleClick={() => window.location.reload()}
      />
    </>
  );
}
