import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import InputText from "../../../../components/InputText";
import Calendar from "../../../../components/Calendar/Calendar";
import CalendarModal from "../../../../components/CalendarModal/CalendarModal";

export default function RegisterSchedule(props) {
  const { studentData } = props;

  const { laboId } = useParams();

  const [inputs, setInputs] = useState({});
  const [scheduleSelected, setScheduleSelected] = useState(Date());
  const [userSchedule, setUserSchedule] = useState();

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
  let userScheduleFormated = new Date(userSchedule).toString().substring(0, 21);

  return (
    <>
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
        ></Calendar>
      </Container>
      {!userSchedule && (
        <Container>
          <h1>Inscribirse en el laboratorio</h1>
          <form onSubmit={handleSubmitSelectSchedule}>
            <InputText
              type="text"
              title="Día"
              name="day"
              value={inputs.day || ""}
              onChange={handleChange}
            />
            <InputText
              type="text"
              title="Mes"
              name="month"
              value={inputs.month || ""}
              onChange={handleChange}
            />
            <InputText
              type="text"
              title="Hora"
              name="hour"
              value={inputs.hour || ""}
              onChange={handleChange}
            />

            <button type="submit" style={{ border: "none" }}>
              <CalendarModal
                scheduleSelected={scheduleSelected}
                laboId={laboId}
                // isScheduled={isScheduled}
              ></CalendarModal>
            </button>
          </form>
        </Container>
      )}
    </>
  );
}
