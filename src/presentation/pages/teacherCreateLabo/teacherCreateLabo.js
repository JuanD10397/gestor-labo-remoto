import React from "react";
import { Button } from "react-bootstrap";
import Container from "../../components/Container";
import InputText from "../../components/InputText";
import { useState } from "react";
// import { apiUrl } from "../../../assets/utils/index";
// import { useSelector } from "react-redux";
// import { increment } from "../../../domain/actions/counterAction";
// import { useDispatch } from "react-redux";
import TextArea from "../../components/TextArea/TextArea";

export default function TeacherCreateLabo() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    // try {
    //   let config = {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(inputs),
    //   };

    //   let res = await fetch(`${apiUrl}/teacher/login`, config);
    //   let json = await res.json();

    //   console.log("json: ", json);
    //   // const teacherToken = json[Object.keys(json)[0]];

    //   // console.log(teacherToken);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <h1>Crear Laboratorio</h1>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          title="Título"
          name="title"
          value={inputs.title || ""}
          onChange={handleChange}
        />
        <TextArea
          title="Descripción"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}
        />
        <Button variant="success" type="submit">
          Crear
        </Button>
      </form>
    </Container>
  );
}
