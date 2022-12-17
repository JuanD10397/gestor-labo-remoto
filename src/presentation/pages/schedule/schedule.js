import React from "react";
import { Button } from "react-bootstrap";
import Container from "../../components/Container";

import { useSelector } from "react-redux";
import { increment } from "../../../domain/actions/counterAction";
import { useDispatch } from "react-redux";

export default function Schedule() {
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <Container>
      <h1>Counter {counter}</h1>
      <Button onClick={() => dispatch(increment())}>Registrar</Button>
    </Container>
  );
}
