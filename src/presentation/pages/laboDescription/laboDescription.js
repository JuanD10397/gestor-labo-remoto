import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Calendar from "../../components/Calendar";
import { Button } from "react-bootstrap";
import InputText from "../../components/InputText";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitAddStudent = async (event) => {
    event.preventDefault();

    //handleChange el emailStudent a inputs.
    // Esta línea de setInputs agrega el laboId a inputs. Eso es lo que debo enviar en el body al API
    setInputs((values) => ({ ...values, labId: laboId }));

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

  async function getLabo() {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${apiUrl}/lab/${laboId}`, config);
    const data = await response.json();
    setLabo(data.labs[0]);
    setLoading(false);
  }

  // La función getLabo() solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getLabo();
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <>Cargando...</>
        ) : (
          <>
            <h1>{labo.lab_title}</h1>
            <div>Labo numero {laboId}</div>
            <br></br>
            <div>{labo.lab_description}</div>
            <br></br>
            <div>
              Tiempo de duración de la práctica de Laboratorio:{" "}
              <b>{labo.lab_timeNeeded}</b>
            </div>
          </>
        )}
      </Container>
      {userType === "teacher" ? (
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
