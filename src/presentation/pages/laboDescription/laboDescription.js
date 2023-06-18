import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";
import AddStudentToLabo from "./components/AddStudentToLabo/AddStudentToLabo";
import StudentsRegisteredInLabo from "./components/StudentsRegisteredInLabo/StudentsRegisteredInLabo";
import RegisterSchedule from "./components/RegisterSchedule/RegisterSchedule";

export default function LaboDescription() {
  const { laboId } = useParams();
  const navigate = useNavigate(); // para redireccionar
  const [jwt] = useLocalState("", "jwt");
  const [userType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
  const [userComplete, setUserComplete] = useState({});
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

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

  // GET COMPLETE USER DATA by jwt
  async function getStudentComplete() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      // body: JSON.stringify({ type: userType }),
    };
    const response = await fetch(`${apiUrl}/student/tokenAuth`, config);
    const data = await response.json();
    setUserComplete(data.result[0]);
  }

  // La función getLabo() solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getLabo();
    if (userType === "student") getStudentComplete();
  }, []);

  console.log("labo: ", labo);

  return (
    <>
      <Container>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
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
            <Button
              variant="secondary"
              style={{ marginTop: "10px" }}
              onClick={() => navigate("/laboratories")}
            >
              Volver
            </Button>
          </>
        )}
      </Container>
      {/* ESTA PARTE SOLO SE MUESTRA SI userType = teacher */}
      {userType === "teacher" ? (
        <div>
          <AddStudentToLabo laboId={labo.lab_id} />
          <StudentsRegisteredInLabo laboId={labo.lab_id} />
        </div>
      ) : (
        userType === "student" && (
          <>
            {/* ESTA PARTE SOLO SE MUESTRA SI userType = student */}
            <RegisterSchedule studentData={userComplete} />
          </>
        )
      )}
    </>
  );
}
