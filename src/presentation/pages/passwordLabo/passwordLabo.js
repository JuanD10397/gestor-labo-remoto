import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [labo, setLabo] = useState({});
  const [loading, setLoading] = useState(true);
  const [rustdeskPassword, setRustdeskPassword] = useState("");
  const [rustdeskId, setRustdeskId] = useState("");

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

  // La función getLabo() solo se ejecuta una vez, al cargar la página
  useEffect(() => {
    getLabo();
    getRustdeskPassword();
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
            <br></br>
            <h5>
              ID: <b>{rustdeskId}</b>
            </h5>
            <h5>
              Contraseña: <b>{rustdeskPassword}</b>
            </h5>
          </>
        )}
      </Container>
    </>
  );
}
