import React, { useState } from "react";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";
import Container from "../../../../components/Container";
import InputText from "../../../../components/InputText";
import { Button } from "react-bootstrap";

export default function AddStudentToLabo(props) {
  const { laboId } = props;
  console.log("laboId: ", laboId);

  const [jwt] = useLocalState("", "jwt");
  const [inputs, setInputs] = useState({});

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Agregar estudiante</h1>
      <form onSubmit={handleSubmitAddStudent}>
        <InputText
          type="email"
          title="Correo"
          name="emailStudent"
          value={inputs.emailStudent || ""}
          onChange={handleChange}
        />
        <Button variant="success" type="submit">
          Agregar
        </Button>{" "}
      </form>
    </Container>
  );
}
