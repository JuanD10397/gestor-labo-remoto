import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { registerScheduleAction } from "../../../domain/actions/calendarActions";

export default function CalendarModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { scheduleSelected } = props;

  // Corto la string del schedule para pintarla más entendible en pantalla
  let date = scheduleSelected[scheduleSelected?.length - 1]?.substring(0, 21);

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
          {/* <Form>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startTime">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(registerScheduleAction(scheduleSelected))}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
