import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import Container from "../../components/Container";
import LaboCard from "../../components/LaboCard/LaboCard";
import LogoUnmsm from "../../../assets/img/unmsm.png";
import { apiUrl } from "../../../assets/utils/index";
import { useLocalState } from "../../hooks/useLocalState";

import "./myLabos.scss";

export default function MyLabos() {
  // DATA MOCK

  // const [labos, setLabos] = useState([
  //   {
  //     lab_id: 1,
  //     lab_title: "Electronica",
  //     image: LogoUnmsm,
  //     lab_desc_short: "Descripción corta",
  //     lab_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  //   {
  //     lab_id: 2,
  //     lab_title: "Algoritmica 1",
  //     image: LogoUnmsm,
  //     lab_desc_short: "Descripción corta",
  //     lab_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  //   {
  //     lab_id: 3,
  //     lab_title: "Análisis y Diseño de Algoritmos",
  //     image: LogoUnmsm,
  //     lab_desc_short: "Descripción corta",
  //     lab_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  // ]);

  // console.log("labos:", labos);

  const [jwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const [labos, setLabos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // para redireccionar

  // GET LABOS
  async function getLabos() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ type: userType }),
    };
    const response = await fetch(`${apiUrl}/lab`, config);
    const data = await response.json();
    setLabos(data.labs);
    setLoading(false);
  }

  useEffect(() => {
    getLabos();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{display:"flex", justifyContent:"center", marginTop: "20px"}}>
          <Spinner animation="border" variant="primary"/>
        </div>
      ) : (
        <Container fluid="xl">
          <h1>Mis Laboratorios</h1>
          <div className="grid-container">
            <>
              {labos?.map((labo) => {
                return (
                  <LaboCard
                    key={labo.lab_id}
                    laboId={labo.lab_id}
                    title={labo.lab_title}
                    image={LogoUnmsm}
                    objetives={labo.lab_objectives}
                    link="/laboratories/"
                    btnTxt="Entrar"
                    deleteTxt={userType==="teacher" ? "Eliminar" : "Retirarse"}
                  />
                );
              })}
            </>  
          </div>
          <Button variant="secondary" style={{marginTop:"15px"}} onClick={() => navigate("/home")}>
            Volver
          </Button>
        </Container>
      )}
    </>
  );
}
