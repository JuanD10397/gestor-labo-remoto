import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import InputText from "../../../../components/InputText";
import Calendar from "../../../../components/Calendar/Calendar";
import CalendarModal from "../../../../components/CalendarModal/CalendarModal";
import { useDateFormat } from "../../../../hooks/useDateFormat";
import { Spinner } from "react-bootstrap";
import { useLocalState } from "../../../../hooks/useLocalState";
import { apiUrl } from "../../../../../assets/utils";

export default function RegisterSchedule(props) {
  const { studentData } = props;

  const { laboId } = useParams();

  const [jwt] = useLocalState("", "jwt");

  const [inputs, setInputs] = useState({});
  const [scheduleSelected, setScheduleSelected] = useState(Date());
  const [userSchedule, setUserSchedule] = useState();
  const [loading, setLoading] = useState(true);

  const [scheduleComplete, setScheduleComplete] = useState([]);
  const [scheduleStartTime, setScheduleStartTime] = useState([]);

  /////////////////////////////////////////////////////////////////////////////////////////////
  async function getSchedule() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ lab: laboId }),
    };
    const response = await fetch(`${apiUrl}/lab/schedules`, config);
    const data = await response.json();
    //console.log(data.schedules[0].sch_start);
    let scheduleStartTimeArray = [];

    // Recorro todos los schdules registrados en la BD y los guardo en arreglo
    for (let i = 0; i < data.schedules.length; i++) {
      //console.log(data.schedules[i].sch_start);
      scheduleStartTimeArray.push(data.schedules[i].sch_start);
    }

    setScheduleComplete(data.schedules);
    setScheduleStartTime(scheduleStartTimeArray);

    setLoading(false);
  }

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    // Tomo solamente el horario del estudiante logueado
    for (let i = 0; i < scheduleComplete.length; i++) {
      if (scheduleComplete[i].stu_id === studentData.stu_id) {
        setUserSchedule(scheduleComplete[i].sch_start);
      }
    }
  }, [scheduleComplete]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // ESTUDIANTE REGISTRA HORARIO
  const handleSubmitSelectSchedule = async (event) => {
    event.preventDefault();

    console.log(inputs);
    if (inputs.day) {
      //console.log(inputs);

      //En Date, month va de 0 a 11. Por eso le resto 1 (si el usuario coloca 12 yo lo transformo en 11 que es diciembre)
      let date = new Date(2023, inputs.month - 1, inputs.day, inputs.hour);
      setScheduleSelected(date);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Formateo schedule para que se lea mejor en pantalla
  let userScheduleFormated = useDateFormat(new Date(userSchedule));

  console.log("loading: ", loading);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {" "}
          {userSchedule && (
            <Container>
              El horario elegido es: <b>{userScheduleFormated}</b>
            </Container>
          )}
          <Container containerType="myContainer2">
            <Calendar
              laboId={laboId}
              setUserSchedule={setUserSchedule}
              studentData={studentData}
              setLoading={setLoading}
              scheduleStartTime={scheduleStartTime}
            />
          </Container>
          {!userSchedule && (
            <Container>
              <h1>Inscribirse en el laboratorio</h1>
              <form onSubmit={handleSubmitSelectSchedule}>
                <InputText
                  type="text"
                  title="Día"
                  placeholder="12"
                  name="day"
                  value={inputs.day || ""}
                  onChange={handleChange}
                />
                <InputText
                  type="text"
                  title="Mes"
                  placeholder="5"
                  name="month"
                  value={inputs.month || ""}
                  onChange={handleChange}
                />
                <InputText
                  type="text"
                  title="Hora"
                  placeholder="22"
                  name="hour"
                  value={inputs.hour || ""}
                  onChange={handleChange}
                />

                <button type="submit" style={{ border: "none" }}>
                  <CalendarModal
                    scheduleSelected={scheduleSelected}
                    laboId={laboId}
                    // isScheduled={isScheduled}
                  />
                </button>
              </form>
            </Container>
          )}
        </>
      )}
    </>
  );
}

// {userSchedule && (
//   <Container>
//     El horario elegido es: <b>{userScheduleFormated}</b>
//   </Container>
// )}
// <Container containerType="myContainer2">
//   <Calendar
//     laboId={laboId}
//     setUserSchedule={setUserSchedule}
//     studentData={studentData}
//     setLoading={setLoading}
//   />
// </Container>
// {!userSchedule && (
//   <Container>
//     <h1>Inscribirse en el laboratorio</h1>
//     <form onSubmit={handleSubmitSelectSchedule}>
//       <InputText
//         type="text"
//         title="Día"
//         placeholder="12"
//         name="day"
//         value={inputs.day || ""}
//         onChange={handleChange}
//       />
//       <InputText
//         type="text"
//         title="Mes"
//         placeholder="5"
//         name="month"
//         value={inputs.month || ""}
//         onChange={handleChange}
//       />
//       <InputText
//         type="text"
//         title="Hora"
//         placeholder="22"
//         name="hour"
//         value={inputs.hour || ""}
//         onChange={handleChange}
//       />

//       <button type="submit" style={{ border: "none" }}>
//         <CalendarModal
//           scheduleSelected={scheduleSelected}
//           laboId={laboId}
//           // isScheduled={isScheduled}
//         />
//       </button>
//     </form>
//   </Container>
// )}
