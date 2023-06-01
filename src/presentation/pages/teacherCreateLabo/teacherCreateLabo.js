import React from "react";
import { Button } from "react-bootstrap";
import Container from "../../components/Container";
import InputText from "../../components/InputText";
import { useState } from "react";
import TextArea from "../../components/TextArea/TextArea";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";

export default function TeacherCreateLabo() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitCreateLabo = async (event) => {
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

      let res = await fetch(`${apiUrl}/teacher/lab`, config);
      let json = await res.json();

      console.log("json: ", json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Crear Laboratorio</h1>
        <form onSubmit={handleSubmitCreateLabo}>
          <InputText
            type="text"
            title="Título"
            name="labTitle"
            value={inputs.labTitle || ""}
            onChange={handleChange}
          />
          <InputText
            type="text"
            title="Descripción corta"
            name="labDescShort"
            value={inputs.labDescShort || ""}
            onChange={handleChange}
          />
          <TextArea
            title="Descripción"
            name="labDescription"
            value={inputs.labDescription || ""}
            onChange={handleChange}
          />
          <Button variant="success" type="submit">
            Crear
          </Button>
        </form>
      </Container>
    </>
  );
}