import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
  const [userComplete, setUserComplete] = useState({});
  const [loading, setLoading] = useState(true);
  const [rustdeskPassword, setRustdeskPassword] = useState("");
  const [rustdeskId, setRustdeskId] = useState("");
  const [studentSchedule, setStudentSchedule] = useState();
  const [textSchedule, setTextSchedule] = useState("");
  const navigate = useNavigate(); // para redireccionar
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
  }

  // Get Rustdesk Password
  async function getRustdeskPassword() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ lab: laboId }),
    };
    const response = await fetch(`${apiUrl}/lab/getPassword`, config);
    const data = await response.json();
    setRustdeskId(data.labs[0].con_rustdeskId);
    setRustdeskPassword(data.labs[0].con_password);
  }

  // GET COMPLETE USER DATA by jwt
  async function getStudentComplete() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await fetch(`${apiUrl}/student/tokenAuth`, config);
    const data = await response.json();
    setUserComplete(data.result[0]);
  }

  // Get Student Schedule
  async function getStudentSchedule() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ lab: laboId }),
    };
    const response = await fetch(`${apiUrl}/lab/schedules`, config);
    const data = await response.json();

    // Tomo solamente el horario del estudiante logueado en el labo específico
    if (userComplete && labo) {
      for (let i = 0; i < data.schedules.length; i++) {
        if (
          data.schedules[i].stu_id === userComplete.stu_id &&
          data.schedules[i].lab_id === labo.lab_id
        ) {
          setStudentSchedule(data.schedules[i].sch_start);
        }
      }

      setLoading(false);
    }
  }

  // Estas funiones solo se ejecutan una vez, al cargar la página
  useEffect(() => {
    getLabo();
    getRustdeskPassword();
    getStudentComplete();
  }, []);

  // Cuando tenga el id del estudiante y del labo llamo funcion para obtener su schedule
  useEffect(() => {
    getStudentSchedule();
  }, [userComplete, labo]);

  useEffect(() => {
    if (studentSchedule) {
      const actualDate = new Date().getTime();
      let studentStartDate = new Date(studentSchedule);
      let studentEndDate = new Date(
        studentStartDate.getTime() + 1 * 60 * 60 * 1000
      );

      if (actualDate < studentStartDate)
        setTextSchedule("Tu horario aun no empieza");
      else if (actualDate > studentEndDate)
        setTextSchedule("Tu hora ya finalizó");
      else setTextSchedule("");
    } else setTextSchedule("No has seleccionado horario para este laboratorio");
  }, [studentSchedule]);

  // Formateo schedule para que se lea mejor en pantalla
  let userScheduleFormated = new Date(studentSchedule)
    .toString()
    .substring(0, 21);

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
            <br></br>
            <h5>
              ID: <b>{rustdeskId}</b>
            </h5>
            <div>Tu horario es: {userScheduleFormated}</div>

            {textSchedule ? (
              <b style={{ color: "red" }}>{textSchedule}</b>
            ) : (
              <h5>
                Contraseña: <b>{rustdeskPassword}</b>
              </h5>
            )}
            
          </>
        )}
        <Button variant="secondary" style={{marginTop:"15px" , display:"block"}} onClick={() => navigate("/passwordlabo")}>
          Volver
        </Button>
      </Container>
    </>
  );
}
