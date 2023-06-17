import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function MyModal(props) {

  const {title, description, description2, show, setShow, handleClick} = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {description}
          </p>
          {description2 && 
            <p>
              {description2}
            </p>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClick ? handleClick : handleClose}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
