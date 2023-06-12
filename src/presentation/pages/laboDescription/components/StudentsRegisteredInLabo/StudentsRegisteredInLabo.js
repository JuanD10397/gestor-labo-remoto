import React, { useEffect, useState } from "react";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";
import Container from "../../../../components/Container";
import Button from "react-bootstrap/Button";

export default function StudentsRegisteredInLabo(props) {

  // DATA MOCK
  const [studentsRegistered, setStudentsRegistered] = useState([
    {
      nombre: "Juliana",
      apellido: "Pérez",
      correo: "juliana@gmail.com",
      horario: "7pm",
    },
    {
      nombre: "Gonzalo",
      apellido: "Lora",
      correo: "gonzalo@gmail.com",
      horario: "8pm",
    },
    {
      nombre: "",
      apellido: "",
      correo: "adrian@gmail.com",
      horario: "",
    },
    {
      nombre: "Emily",
      apellido: "Mariño",
      correo: "Emily@gmail.com",
      horario: "",
    },
    {
      nombre: "",
      apellido: "",
      correo: "elvis@gmail.com",
      horario: "",
    },
  ]);

  return (
    <>
      <Container>
        <h1>Estudiantes Matriculados</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Horario</th>
            </tr>
          </thead>
          <tbody>
            {studentsRegistered.map((student) => {
              return (
                <>
                  <tr>
                    <td>{student.nombre}</td>
                    <td>{student.apellido}</td>
                    <td>{student.correo}</td>
                    <td>{student.horario}</td>
                    <td>
                      <Button type="submit" variant="danger">Retirar</Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </Container>
    </>
  );
}
