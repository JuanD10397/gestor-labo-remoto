import React from "react";
import { Container } from "react-bootstrap";

import "./Container.scss";

export default function MyContainer(props) {
  const { containerType } = props;

  return (
    // <Container className={containerType ? { containerType } : "myContainer1"}>
    <Container className={containerType ? containerType : "myContainer1"}>
      {props.children}
    </Container>
  );
}
