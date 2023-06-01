import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import InputText from "../../components/InputText";
import { useDispatch } from "react-redux";
import { registerScheduleAction } from "../../../domain/actions/calendarActions";
import { apiUrl } from "../../../assets/utils/index";
import { useLocalState } from "../../hooks/useLocalState";
// import { useEffect } from "react";

export default function CalendarModal(props) {
  const { scheduleSelected, laboId } = props;

  const dispatch = useDispatch();
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Corto la string del schedule para pintarla más entendible en pantalla
  // let date = scheduleSelected[scheduleSelected?.length - 1]?.substring(0, 21);
  // console.log(scheduleSelected);
  // console.log(laboId);

  let date = scheduleSelected.toString().substring(0, 21);

  const handleSubmitRegisterSchedule = async (event) => {
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ start: scheduleSelected, lab: laboId }),
      };

      let res = await fetch(`${apiUrl}/student/addSchedule`, config);
      let json = await res.json();

      console.log("json: ", json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Inscribirme
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Reserva de horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Deseas inscribirte en el horario?</h4>
          <p>{date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(registerScheduleAction(scheduleSelected));
              handleSubmitRegisterSchedule();
              handleClose();
            }}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
