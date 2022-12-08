import ScheduleSelector from "react-schedule-selector";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CalendarModal from "../CalendarModal/CalendarModal";
// import { es } from "date-fns/locale";

export default function Calendar() {
  const calendar = useSelector((state) => state.calendar);

  // console.log(calendar.stateSchedule);

  const [schedule, setSchedule] = useState([]);
  const [oldSchedule, setOldSchedule] = useState([]);
  // const [chosenSchedule, setChosenSchedule] = useState("");

  useEffect(() => {
    //Runs only on the first render
    setSchedule(calendar.stateSchedule);
    setOldSchedule(calendar.stateSchedule);
  }, []);

  const handleChange = (newSchedule) => {
    // console.log("schedule: ", schedule);
    // console.log("newSchedule: ", newSchedule[newSchedule.length - 1]);

    // Convierto el nuevo horario en string y lo agrego al schedule completo
    let newTimeString = newSchedule[newSchedule.length - 1].toString();
    let newScheduleString = [];
    schedule.map((i) => newScheduleString.push(i));

    // setChosenSchedule(newScheduleString);

    console.log("newScheduleString: ", newScheduleString);
    // console.log("chosenSchedule: ", chosenSchedule);

    if (
      schedule?.length + 1 === newSchedule?.length &&
      oldSchedule?.length + 1 === newSchedule?.length
    ) {
      console.log("Si se puede");
      newScheduleString.push(newTimeString);

      // Cambio estado y actualizo state global con el newSchedule convertido en string
      setSchedule(newScheduleString);
    } else if (schedule?.length === newSchedule?.length) {
      console.log("No pasa nada");
    } else {
      console.log("Solo debes seleccionar 1 hora");
    }
  };

  return (
    <div>
      <ScheduleSelector
        selection={schedule}
        numDays={7}
        minTime={0}
        maxTime={24}
        hourlyChunks={1}
        dateFormat="ddd D/M"
        onChange={handleChange}
      />
      <CalendarModal scheduleSelected={schedule}></CalendarModal>
    </div>
  );
}
