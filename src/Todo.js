import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import AssignmentIcon from "@material-ui/icons/Assignment";

// database
import { db } from "./firebase";

// update todo component
import UpdateTodo from "./UpdateTodo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 900,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function Todo({ todo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar variant="rounded" className={classes.rounded}>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              style={{ textTransform: "capitalize" }}
              primary={todo.todo}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => db.collection("todos").doc(todo.id).delete()}
              >
                <DeleteIcon />
              </IconButton>

              {/* <IconButton edge="end" aria-label="delete">
                <EditIcon />
              </IconButton> */}
              <UpdateTodo todo={todo} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
