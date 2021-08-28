import React, { useState } from "react";
import UserTable from "./UserTable";
import EditUserForm from "./EditUserForm";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    padding: theme.spacing(2)
  }
}));
const Home = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4">
            Simple CRUD App
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <EditUserForm
            addUser={addUser}
            editing={editing}
            setEditing={setEditing}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6">
            User Table
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
