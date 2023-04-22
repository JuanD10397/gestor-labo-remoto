import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import InputText from "../../../../components/InputText";
import Calendar from "../../../../components/Calendar/Calendar";
import CalendarModal from "../../../../components/CalendarModal/CalendarModal";

export default function RegisterSchedule() {
  const { laboId } = useParams();

  const [inputs, setInputs] = useState({});
  const [scheduleSelected, setScheduleSelected] = useState(Date());

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

  return (
    <>
      <Container containerType="myContainer2">
        <Calendar laboId={laboId}></Calendar>
      </Container>
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
            ></CalendarModal>
          </button>
        </form>
      </Container>
    </>
  );
}
