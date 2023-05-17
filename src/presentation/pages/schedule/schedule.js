import React from "react";
import { Button } from "react-bootstrap";
import Container from "../../components/Container";
import Calendar from "../../components/Calendar";

import { useSelector } from "react-redux";
import { increment } from "../../../domain/actions/counterAction";
import { useDispatch } from "react-redux";

export default function Schedule() {
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <Container>
      {/* ESTO ES UN COUNTER DE EJEMPLO PARA ENTENDER REDUX */}
      {/* <h1>Counter {counter}</h1> */}
      {/* <Button onClick={() => dispatch(increment())}>Registrar</Button> */}
      <Calendar></Calendar>
    </Container>
  );
}
