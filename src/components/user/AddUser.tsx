import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { addUser } from "../../app/userSlice";
import User from "../../types/User";
import FormModal from "../ui/FormModal";
import { v4 as uuidv4 } from "uuid";

const INITIAL_MODAL_STATE = { show: false, error: false, message: "" };
const EMPTY_AGE = -999;

const AddUser = () => {
  const dispatch = useAppDispatch();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState(EMPTY_AGE);
  const [modalInfo, setModalInfo] = useState(INITIAL_MODAL_STATE);

  const onChangeUsernameHandler = (event: Event | any) => {
    setEnteredUsername(event.target.value);
  };

  const onChangeAgeHandler = (event: Event | any) => {
    setEnteredAge(event.target.value);
  };

  const onCloseFormErrorModal = () => {
    setModalInfo(INITIAL_MODAL_STATE);
  };

  const emptyFields = () => {
    setEnteredUsername("");
    setEnteredAge(EMPTY_AGE);
  }

  const onSubmitHandler = (event: Event | any) => {
    //Prevent form submit
    event.preventDefault();
    //Resets error
    setModalInfo(INITIAL_MODAL_STATE);
    //Verify if empty
    if (enteredUsername === "" || enteredAge.toString() === "" || enteredAge === EMPTY_AGE) {
      setModalInfo({
        show: true,
        error: true,
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    //Verify if age is wrong
    if (isNaN(enteredAge) || enteredAge <= 0) {
      setModalInfo({
        show: true,
        error: true,
        message: "Please enter a valid age (> 0).",
      });
      setEnteredAge(EMPTY_AGE);
      return;
    }
    //Success
    const user: User = {
      id: uuidv4(),
      username: enteredUsername,
      age: enteredAge,
    };
    dispatch(addUser(user));
    emptyFields();
    setModalInfo({
      show: true,
      error: false,
      message: "User added successfuly.",
    });
  };

  return (
    <div>
      {modalInfo.show && (
        <FormModal
          modalInfo={modalInfo}
          closeModalHandler={onCloseFormErrorModal}
        >
          {modalInfo.message}
        </FormModal>
      )}
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Header className="text-center">Add User</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={onChangeUsernameHandler}
                    value={enteredUsername}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    step="1"
                    placeholder="Enter an age"
                    onChange={onChangeAgeHandler}
                    value={enteredAge === -999 ? "" : enteredAge}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
