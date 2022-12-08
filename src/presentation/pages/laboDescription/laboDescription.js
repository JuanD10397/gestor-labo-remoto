import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import CalendarModal from "../../components/CalendarModal/CalendarModal";
import Calendar from "../../components/Calendar";

import "./laboDescription.scss";

export default function LaboDescription() {
  const { laboId } = useParams();
  console.log(laboId);

  return (
    <Container>
      <h1>Description Labo</h1>
      <div>Labo numero {laboId}</div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum
      </div>
      <Container containerType="myContainer2">
        <Calendar></Calendar>
        <CalendarModal></CalendarModal>
      </Container>
    </Container>
  );
}
