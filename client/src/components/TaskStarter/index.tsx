import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";

export default function TaskStarter() {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState("");
  const [params, setParams] = useState([{ name: "Param1", value: "" }]);

  const handleChange = (index: number, value: string) => {
    const updatedParams = [...params];
    updatedParams[index].value = value;
    setParams(updatedParams);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (params.some((param) => param.value === "")) {
      setMessageInfo("Please fill in all params");
      setOpen(true);
      return;
    }

    try {
      const paramValues = params.reduce(
        (result, param) => ({ ...result, [param.name]: param.value }),
        {}
      );

      const response = await axios.post("http://127.0.0.1:5000/start", {
        ...paramValues,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addParam = () => {
    const newParam = { name: `Param${params.length + 1}`, value: "" };
    setParams([...params, newParam]);
  };

  const deleteParam = (index: number) => {
    const updatedParams = [...params];
    updatedParams.splice(index, 1);
    setParams(updatedParams);
  };

  return (
    <div className="task-starter-container">
      <h2>Task Starter</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-container">
          {params.map((param, index) => (
            <div key={index}>
              <TextField
                size="small"
                label={param.name}
                value={param.value}
                onChange={(e) => handleChange(index, e.target.value)}
                variant="outlined"
                margin="normal"
                error={param.value === ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      disabled={params.length === 1}
                      onClick={() => {
                        deleteParam(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>
          ))}
        </div>
        <Box>
          <Button variant="contained" color="primary" onClick={addParam}>
            + Add Param
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Start Task
          </Button>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {messageInfo}
        </Alert>
      </Snackbar>
    </div>
  );
}
