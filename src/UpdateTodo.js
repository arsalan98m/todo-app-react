import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import { db } from "./firebase";

const UpdateTodo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [Input, setInput] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: Input }, { merge: true })
      .then(() => {
        setOpen(false);
      });
  }

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Write Todo"
            type="text"
            fullWidth
            value={Input}
            placeholder={props.todo.todo}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Update Todo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTodo;
