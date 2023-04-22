import ScheduleSelector from "react-schedule-selector";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CalendarModal from "../CalendarModal/CalendarModal";
import { apiUrl } from "../../../assets/utils/index";
import { useLocalState } from "../../hooks/useLocalState";
import { useDispatch } from "react-redux";
import { registerScheduleAction } from "../../../domain/actions/calendarActions";
// import { es } from "date-fns/locale";

export default function Calendar(props) {
  const { laboId } = props;
  const dispatch = useDispatch();

  //const calendar = useSelector((state) => state.calendar); ////////////////////////////////////////////////////// DESCOMENTAR

  // console.log(calendar.stateSchedule);

  const [schedule, setSchedule] = useState([]);
  const [oldSchedule, setOldSchedule] = useState([]);
  // const [chosenSchedule, setChosenSchedule] = useState("");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////// DESCOMENTAR
  // useEffect(() => {
  //   //Runs only on the first render
  //   setSchedule(calendar.stateSchedule);
  //   setOldSchedule(calendar.stateSchedule);
  // }, []);
  ///////////////////////////////////////////////////////

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
    let scheduleArray = [];
    for (let i = 0; i < data.schedules.length; i++) {
      //console.log(data.schedules[i].sch_start);
      scheduleArray.push(data.schedules[i].sch_start);
    }

    console.log(data.schedules);

    setSchedule(scheduleArray);

    //setLoading(false);
  }

  useEffect(() => {
    getSchedule();
    //dispatch(registerScheduleAction(schedule));
  }, []);

  // Cambia formato de Schedule con fecha y hora de Perú
  // Solo lo necesito para imprimir en consola.
  // El resto de cosas del calendario funciona bien sin necesidad de formato
  let formatedSchedule = schedule.map(function (element) {
    return new Date(element);
  });
  // console.log(formatedSchedule);

  return (
    <div>
      <ScheduleSelector
        selection={schedule}
        numDays={7}
        minTime={0}
        maxTime={24}
        hourlyChunks={1}
        dateFormat="ddd D/M"
        // onChange={handleChange}
      />
      {/* <CalendarModal scheduleSelected={schedule}></CalendarModal> */}
    </div>
  );
}
