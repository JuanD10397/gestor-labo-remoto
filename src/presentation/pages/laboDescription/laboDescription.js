import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Calendar from "../../components/Calendar";
import { Button } from "react-bootstrap";
import InputText from "../../components/InputText";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";
import CalendarModal from "../../components/CalendarModal/CalendarModal";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  const [scheduleSelected, setScheduleSelected] = useState(Date());
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // GET LABO by ID
  async function getLabo() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ type: userType }),
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

  // DOCENTE AñADE ESTUDIANTE
  const handleSubmitAddStudent = async (event) => {
    event.preventDefault();

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

  // ESTUDIANTE REGISTRA HORARIO
  const handleSubmitSelectSchedule = async (event) => {
    event.preventDefault();

    console.log(inputs);
    if (inputs.day) {
      //console.log(inputs);

      //En Date, month va de 0 a 11. Por eso le resto 1 (si el usuario coloca 12 yo lo transformo en 11 que es diciembre)
      let date = new Date(2022, inputs.month - 1, inputs.day, inputs.hour);
      setScheduleSelected(date);
    }
  };

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
      {/* ESTA PARTE SOLO SE MUESTRA SI userType = teacher */}
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
          <>
            {/* ESTA PARTE SOLO SE MUESTRA SI userType = student */}
            <Container containerType="myContainer2">
              <Calendar laboId={laboId}></Calendar>
            </Container>
            <Container>
              <h1>Inscribirse en el laboratorio</h1>
              <form onSubmit={handleSubmitSelectSchedule}>
                <InputText
                  type="text"
                  title="Día"
                  name="day"
                  value={inputs.day || ""}
                  onChange={handleChange}
                />
                <InputText
                  type="text"
                  title="Mes"
                  name="month"
                  value={inputs.month || ""}
                  onChange={handleChange}
                />
                <InputText
                  type="text"
                  title="Hora"
                  name="hour"
                  value={inputs.hour || ""}
                  onChange={handleChange}
                />

                <button type="submit" style={{ border: "none" }}>
                  <CalendarModal
                    scheduleSelected={scheduleSelected}
                    laboId={laboId}
                  ></CalendarModal>
                </button>
                {/* <Button size="sm" type="submit">
                  hola
                </Button> */}
              </form>
            </Container>
          </>
        )
      )}
    </>
  );
}
