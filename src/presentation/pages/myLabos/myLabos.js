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
  //     lab_description:
  //       "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //   },
  //   {
  //     lab_id: 2,
  //     lab_title: "Algoritmica 1",
  //     image: LogoUnmsm,
  //     lab_description:
  //       "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //   },
  //   {
  //     lab_id: 3,
  //     lab_title: "Análisis y Diseño de Algoritmos",
  //     image: LogoUnmsm,
  //     lab_description:
  //       "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //   },
  //   {
  //     lab_id: 4,
  //     lab_title: "Mecatronica",
  //     image: LogoUnmsm,
  //     lab_description:
  //       "Some quick example text to build on the card title and make up the bulk of the card's content.",
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
