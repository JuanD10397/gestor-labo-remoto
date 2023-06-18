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
  const { laboId, setUserSchedule, studentData } = props;
  const dispatch = useDispatch();

  //const calendar = useSelector((state) => state.calendar); ////////////////////////////////////////////////////// DESCOMENTAR

  // const [schedule, setSchedule] = useState([]);
  // const [oldSchedule, setOldSchedule] = useState([]);

  const [scheduleComplete, setScheduleComplete] = useState([]);
  const [scheduleStartTime, setScheduleStartTime] = useState([]);

  // const [chosenSchedule, setChosenSchedule] = useState("");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////// DESCOMENTAR
  // useEffect(() => {
  //   //Runs only on the first render
  //   setSchedule(calendar.stateSchedule);
  //   setOldSchedule(calendar.stateSchedule);
  // }, []);
  ///////////////////////////////////////////////////////

  // const handleChange = (newSchedule) => {
  //   // console.log("schedule: ", schedule);
  //   // console.log("newSchedule: ", newSchedule[newSchedule.length - 1]);

  //   // Convierto el nuevo horario en string y lo agrego al schedule completo
  //   let newTimeString = newSchedule[newSchedule.length - 1].toString();
  //   let newScheduleString = [];
  //   schedule.map((i) => newScheduleString.push(i));

  //   // setChosenSchedule(newScheduleString);

  //   console.log("newScheduleString: ", newScheduleString);
  //   // console.log("chosenSchedule: ", chosenSchedule);

  //   if (
  //     schedule?.length + 1 === newSchedule?.length &&
  //     oldSchedule?.length + 1 === newSchedule?.length
  //   ) {
  //     console.log("Si se puede");
  //     newScheduleString.push(newTimeString);

  //     // Cambio estado y actualizo state global con el newSchedule convertido en string
  //     setSchedule(newScheduleString);
  //   } else if (schedule?.length === newSchedule?.length) {
  //     console.log("No pasa nada");
  //   } else {
  //     console.log("Solo debes seleccionar 1 hora");
  //   }
  // };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const [jwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

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

    //setLoading(false);
  }

  useEffect(() => {
    getSchedule();
    //dispatch(registerScheduleAction(schedule));
  }, []);

  useEffect(() => {
    // Tomo solamente el horario del estudiante logueado
    for (let i = 0; i < scheduleComplete.length; i++) {
      if (scheduleComplete[i].stu_id === studentData.stu_id) {
        setUserSchedule(scheduleComplete[i].sch_start);
      }
    }
  }, [scheduleComplete]);

  // CAMBIA FORMATO DE schedule CON FECHA Y HORA DE PERU
  // Solo lo necesito para imprimir en consola.
  // El resto de cosas del calendario funciona bien sin necesidad de formato
  let formatedSchedule = scheduleStartTime.map(function (element) {
    return new Date(element);
  });
  // console.log(formatedSchedule);

  // console.log("scheduleComplete: ", scheduleComplete);

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
      {/* <CalendarModal scheduleSelected={schedule}></CalendarModal> */}
    </div>
  );
}
