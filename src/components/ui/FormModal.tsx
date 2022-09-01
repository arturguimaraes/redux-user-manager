import { useState } from "react";
import { Modal } from "react-bootstrap";

const FormModal = (props: any) => {
  const [show, setShow] = useState(true);

  const closeHandler = () => {
    setShow(false);
    props.closeModalHandler();
  };

  return (
    <Modal show={show} onHide={closeHandler} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.modalInfo.error ? "Form error" : "Form submitted"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.children}</p>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
