import { Card, Table } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";

const UserList = () => {
  const users = useAppSelector((state) => state.users.users);
  const empty = users.length === 0;

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <Card>
          <Card.Header className="text-center">Users</Card.Header>
          <Card.Body>
            {empty && <p className="text-center">No users added.</p>}
            {!empty && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} id={user.id}>
                      <td>{index+1}</td>
                      <td>{user.username}</td>
                      <td>{user.age} years old</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserList;
