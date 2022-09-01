import AddUser from "../user/AddUser";
import UserList from "../user/UserList";

const App = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 mb-5">
          <AddUser />
        </div>
        <div className="col-md-12 mb-5">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default App;
