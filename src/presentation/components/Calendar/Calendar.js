import ScheduleSelector from "react-schedule-selector";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { es } from "date-fns/locale";
import { registerScheduleAction } from "../../../domain/actions/calendarActions";

export default function Calendar() {
  const dispatch = useDispatch();

  const calendar = useSelector((state) => state.calendar);

  // console.log(calendar.stateSchedule);

  const [schedule, setSchedule] = useState(calendar.stateSchedule);

  const handleChange = (newSchedule) => {
    // console.log("schedule: ", schedule);
    // console.log("newSchedule: ", newSchedule);
    if (schedule?.length === newSchedule?.length) {
      console.log("No pasa nada");
    } else if (schedule?.length + 1 === newSchedule?.length) {
      console.log("Si se puede");
      setSchedule(newSchedule);
      dispatch(registerScheduleAction(newSchedule));
    } else {
      console.log("Solo debes seleccionar 1 hora");
    }
  };

  return (
    <ScheduleSelector
      selection={schedule}
      numDays={7}
      minTime={0}
      maxTime={24}
      hourlyChunks={1}
      dateFormat="ddd D/M"
      onChange={handleChange}
    />
  );
}
