import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// Component
import Todo from "./Todo";

// database
import { db } from "./firebase";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  main: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    marginTop: "5rem",
  },
  form: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    marginRight: "1rem",
  },
  App: {
    maxWidth: "900px",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen the database and fethc new todos as they get added/removed
  useEffect(() => {
    // This code here... fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(snapshot.docs.map((doc) => doc.data().todo));
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(""); // Clean up the input after clicking add todo button
  };
  return (
    <div className={classes.App}>
      <Grid className={classes.main} container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <h1>
              TODO APP{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <form className={classes.form}>
            <FormControl>
              <InputLabel htmlFor="my-input">
                <span role="img" aria-label="check-mark">
                  ✅
                </span>{" "}
                Write a Todo
              </InputLabel>
              <Input
                className={classes.input}
                id="my-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!input}
              onClick={addTodo}
            >
              Add Todo
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={8}>
          <ul>
            {todos.map((todo, index) => {
              return <Todo key={index} todo={todo} />;
            })}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
