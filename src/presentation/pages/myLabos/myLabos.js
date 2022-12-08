import React, { useState } from "react";
import Container from "../../components/Container";
import LaboCard from "../../components/LaboCard/LaboCard";
import LogoUnmsm from "../../../assets/img/unmsm.png";

import "./myLabos.scss";

export default function MyLabos() {
  const [labos, setLabos] = useState([
    {
      laboId: 1,
      title: "Electronica",
      image: LogoUnmsm,
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      laboId: 2,
      title: "Algoritmica 1",
      image: LogoUnmsm,
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      laboId: 3,
      title: "Análisis y Diseño de Algoritmos",
      image: LogoUnmsm,
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      laboId: 4,
      title: "Mecatronica",
      image: LogoUnmsm,
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
  ]);

  return (
    <Container fluid="xl">
      <h1>Mis Laboratorios</h1>
      <div className="grid-container">
        {labos.map((labo) => {
          return (
            <LaboCard
              key={labo.laboId}
              laboId={labo.laboId}
              title={labo.title}
              image={labo.image}
              description={labo.description}
            />
          );
        })}
      </div>
    </Container>
  );
}
