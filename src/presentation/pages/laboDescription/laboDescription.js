import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";
import AddStudentToLabo from "./components/AddStudentToLabo/AddStudentToLabo";
import RegisterSchedule from "./components/RegisterSchedule/RegisterSchedule";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt] = useLocalState("", "jwt");
  const [userType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
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

  // La función getLabo() solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getLabo();
  });

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
        <AddStudentToLabo laboId={labo.lab_id} />
      ) : (
        userType === "student" && (
          <>
            {/* ESTA PARTE SOLO SE MUESTRA SI userType = student */}
            <RegisterSchedule />
          </>
        )
      )}
    </>
  );
}
