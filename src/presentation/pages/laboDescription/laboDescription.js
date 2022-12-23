import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Calendar from "../../components/Calendar";
import { Button } from "react-bootstrap";
import InputText from "../../components/InputText";
import { useLocalState } from "../../hooks/useLocalStorage";
import { apiUrl } from "../../../assets/utils/index";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});

  const [inputs, setInputs] = useState({});
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  async function getLabo() {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${apiUrl}/lab/?labId=${laboId}`, config);
    const data = await response.json();
    console.log(data.labs[1]); //AQUI DEBO MODIFICAR DEPENDIENDO DEL ID QUE ME DEVUELVA EL API
    setLabo(data.labs[1]);
    //setLoading(false);
  }

  useEffect(() => {
    getLabo();
  }, []);

  return (
    <>
      <Container>
        <h1>{labo.lab_title}</h1>
        <div>Labo numero {laboId}</div>
        <div>{labo.lab_description}</div>
        <div>
          Tiempo de duración de la práctica de Laboratorio:{" "}
          <b>{labo.lab_timeNeeded}</b>
        </div>
      </Container>
      {userType === "teacher" ? (
        <Container>
          <h1>Agregar estudiante</h1>
          <form onSubmit={handleSubmit}>
            <InputText
              type="email"
              title="Correo"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            <Button variant="success" type="submit">
              Agregar
            </Button>{" "}
          </form>
        </Container>
      ) : (
        userType === "student" && (
          <Container containerType="myContainer2">
            <Calendar></Calendar>
          </Container>
        )
      )}
    </>
  );
}
