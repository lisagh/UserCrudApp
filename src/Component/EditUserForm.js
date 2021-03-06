import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

const EditUserForm = (props) => {
  const initialFormState = { id: null, firstName: "", lastName: "" };
  const [user, setUser] = useState(initialFormState);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const reset = () => {
    props.setEditing(false);
    props.setCurrentUser(initialFormState);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!props.editing) {
          if (!user.firstName || !user.lastName) return;
          props.addUser(user);
          setUser(initialFormState);
        } else {
          props.updateUser(user.id, user);
        }
      }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs>
          <TextField
            id="standard-basic"
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="standard-basic"
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
          >
            {props.editing ? " Update user" : "Add new user"}
          </Button>
        </Grid>
        <Grid item xs>
          <Button onClick={reset}>Reset</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUserForm;
