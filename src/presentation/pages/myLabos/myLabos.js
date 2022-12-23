import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import LaboCard from "../../components/LaboCard/LaboCard";
import LogoUnmsm from "../../../assets/img/unmsm.png";
import { apiUrl } from "../../../assets/utils/index";

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

  const [labos, setLabos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getLabos() {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    <Container fluid="xl">
      <h1>Mis Laboratorios</h1>
      <div className="grid-container">
        {loading ? (
          <>Cargando...</>
        ) : (
          labos?.map((labo) => {
            return (
              <LaboCard
                key={labo.lab_id}
                laboId={labo.lab_id}
                title={labo.lab_title}
                image={LogoUnmsm}
                description={labo.lab_desc_short}
              />
            );
          })
        )}
      </div>
    </Container>
  );
}
