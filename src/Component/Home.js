import React, { useState } from "react";
import UserTable from "./UserTable";
import EditUserForm from "./EditUserForm";
import { Container, Grid } from "@material-ui/core";

const Home = () => {
  const usersData = [
    { id: 1, firstName: "John", lastName: "Jackson" },
    { id: 2, firstName: "Craig", lastName: "Smith" },
    { id: 3, firstName: "Ben", lastName: "White" }
  ];

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, firstName: "", lastName: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    });
  };
  const updateUser = (id, updateUser) => {
    setEditing(false);
    setCurrentUser(initialFormState);
    setUsers(users.map((user) => (user.id === id ? updateUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <h1>Simple CRUD App</h1>
      <Grid container spacing={3}>
        <div className="flex-large">
          <h2>Add user</h2>
          <EditUserForm
            addUser={addUser}
            editing={editing}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </Grid>
    </Container>
  );
};

export default Home;
