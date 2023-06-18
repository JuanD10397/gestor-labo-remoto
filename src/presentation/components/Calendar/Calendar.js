import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector"; // https://github.com/bibekg/react-schedule-selector
import { useSelector } from "react-redux";
import CalendarModal from "../CalendarModal/CalendarModal";
import { apiUrl } from "../../../assets/utils/index";
import { useLocalState } from "../../hooks/useLocalState";
import { useDispatch } from "react-redux";
import { registerScheduleAction } from "../../../domain/actions/calendarActions";
// import { es } from "date-fns/locale";

export default function Calendar(props) {
  const { scheduleStartTime } = props;
  const dispatch = useDispatch();

  //const calendar = useSelector((state) => state.calendar); ////////////////////////////////////////////////////// DESCOMENTAR

  // CAMBIA FORMATO DE schedule CON FECHA Y HORA DE PERU
  // Solo lo necesito para imprimir en consola.
  // El resto de cosas del calendario funciona bien sin necesidad de formato
  let formatedSchedule = scheduleStartTime.map(function (element) {
    return new Date(element);
  });

  return (
    <div>
      <ScheduleSelector
        selection={scheduleStartTime}
        numDays={7}
        minTime={0}
        maxTime={24}
        hourlyChunks={1}
        dateFormat="ddd D/M"
        timeFormat="H:mm"
        // startDate="2023-04-10"
        // onChange={handleChange}
      />
    </div>
  );
}
