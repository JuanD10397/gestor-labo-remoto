import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Calendar from "../../components/Calendar";
import { useState } from "react";
import { Button } from "react-bootstrap";
import InputText from "../../components/InputText";
import { useLocalState } from "../../hooks/useLocalStorage";

import "./laboDescription.scss";

export default function LaboDescription() {
  const { laboId } = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  const [inputs, setInputs] = useState({});
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    // try {
    //   let config = {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(inputs),
    //   };

    // let res = await fetch(`${apiUrl}/student/login`, config);
    // let json = await res.json();

    // console.log("json: ", json);

    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <Container>
        <h1>Description Labo</h1>
        <div>Labo numero {laboId}</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum
        </div>
      </Container>
      {userType === "teacher" ? (
        <Container>
          <h1>Agregar estudiante</h1>
          <form onSubmit={handleSubmit}>
            <InputText
              type="email"
              title="Correo"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            <Button variant="success" type="submit">
              Agregar
            </Button>{" "}
          </form>
        </Container>
      ) : (
        userType === "student" && (
          <Container containerType="myContainer2">
            <Calendar></Calendar>
          </Container>
        )
      )}
    </>
  );
}
