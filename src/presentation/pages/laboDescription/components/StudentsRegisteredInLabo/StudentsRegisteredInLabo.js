import React, { useEffect, useState } from "react";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";
import Container from "../../../../components/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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

  const { laboId } = props;

  const [jwt] = useLocalState("", "jwt");
  const [userType] = useLocalState("", "userType");
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET STUDENTS REGISTERED
  async function getStudentsRegistered() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ type: userType }),
    };
    const response = await fetch(`${apiUrl}/lab/${laboId}/students`, config);
    const data = await response.json();
    console.log("data: ", data);
    setStudentsData(data);
    setLoading(false);
  }

  useEffect(() => {
    getStudentsRegistered();
    console.log("studentsData: ", studentsData);
  }, []);

  // useEffect(() => {
  //   console.log("studentsData: ", studentsData);
  // }, [studentsData]);

  return (
    <>
      {loading ? (
          <div style={{display:"flex", justifyContent:"center", marginTop: "20px"}}>
            <Spinner animation="border" variant="primary"/>
          </div>
      ) : (
        <Container>
          <h1>Estudiantes Matriculados</h1>
          {/* <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Horario</th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.students.map((student, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{student.stu_name}</td>
                      <td>{student.stu_lastname}</td>
                      <td>{student.stu_email}</td>
                      <td>{student.horario}</td>
                      <td>
                        <Button type="submit" variant="danger">Retirar</Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table> */}
        </Container>
      )}
    </>
  );
}
