import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

export default function CalendarModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const calendar = useSelector((state) => state.calendar);

  let lenCalendar = calendar.stateSchedule.length;

  console.log(calendar.stateSchedule[lenCalendar - 1]);

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
          <h3>
            Deseas inscribirte en el horario?
            {calendar.stateSchedule[lenCalendar - 1]}
          </h3>
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startTime">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
