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
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(EMPTY_AGE);
  const [modalInfo, setModalInfo] = useState(INITIAL_MODAL_STATE);

  const onChangeUsernameHandler = (event: Event | any) => {
    setUsername(event.target.value);
  };

  const onChangeAgeHandler = (event: Event | any) => {
    setAge(event.target.value);
  };

  const onCloseFormErrorModal = () => {
    setModalInfo(INITIAL_MODAL_STATE);
  };

  const onSubmitHandler = (event: Event | any) => {
    //Prevent form submit
    event.preventDefault();
    //Resets error
    setModalInfo(INITIAL_MODAL_STATE);
    //Verify if empty
    if (username === "" || age.toString() === "" || age === EMPTY_AGE) {
      setModalInfo({
        show: true,
        error: true,
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    //Verify if age is wrong
    if (isNaN(age) || age <= 0) {
      setModalInfo({
        show: true,
        error: true,
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    //Success
    const user: User = {
      id: uuidv4(),
      username: username,
      age: age,
    };
    dispatch(addUser(user));
    setUsername("");
    setAge(EMPTY_AGE);
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
                    value={username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    step="1"
                    placeholder="Enter an age"
                    onChange={onChangeAgeHandler}
                    value={age === -999 ? "" : age}
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
