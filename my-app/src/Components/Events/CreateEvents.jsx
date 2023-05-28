import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Button, Select, TextField } from "@mui/material";
import moment from "moment";
import { createEventApiHandler } from "../../service/api.service";
import SuccessFull from "../SuccessFull";
import Error from "../Error";
import TextError from "../TextError";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function CreateEvents({ open, handleClose }) {
  const [startEventDate, setStartEventDate] = useState("");
  const [endEventDate, setEndEventDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [endEventDateError, setEndEventDateError] = useState("");
  const [startEventDateError, setStartEventDateError] = useState("");
  const [eventStatus, setEventStatus] = useState();
  const [successFullEvent, setSuccessfullEvent] = useState(false);
  const [errorEvent, setErrorEvent] = useState(false);

  const startEventHandler = (date) => {
    setStartEventDate(date);
    console.log("startDate", moment(date).format("YYYY-MM-DDThh:mm:ssTZD"));
  };

  const EndEventHandler = (date) => {
    setEndEventDate(date);
    console.log("date", date);
  };

  const validation = () => {
    let validate = true;
    if (!title) {
      setTitleError("please Enter Title");
      validate = false;
    }
    if (!description) {
      setDescriptionError("please Enter Description");
      validate = false;
    }
    if (!priority) {
      setPriorityError("please select priority");
      validate = false;
    }
    if (!startEventDate) {
      setStartEventDateError("please select Start Event Date");
      validate = false;
    }
    if (!endEventDate) {
      setEndEventDateError("please select End Event Date");
      validate = false;
    }
    return validate;
  };

  const renderTypes = () => {
    switch (eventStatus) {
      case 1:
        return (
          <SuccessFull
            open={successFullEvent}
            handleClose={() => setSuccessfullEvent(false)}
          />
        );
      case 2:
        return (
          <Error open={errorEvent} handleClose={() => setErrorEvent(false)} />
        );
      default:
        return (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Box display={"grid"} rowGap={1.5}>
                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      size="small"
                      fullWidth
                    />
                    {titleError && <TextError message={titleError} />}
                  </Box>
                  <Box display={'flex'} justifyContent={""}>
                    <Box>
                      <label> start Event Time </label>
                      <DatePicker
                        dateFormat="Pp"
                        selected={startEventDate}
                        showTimeSelect
                        onChange={startEventHandler}
                      />
                      {startEventDateError && (
                        <TextError message={startEventDateError} />
                      )}
                    </Box>
                    <Box>
                      <label> end Event Time </label>
                      <DatePicker
                        dateFormat="Pp"
                        selected={endEventDate}
                        showTimeSelect
                        onChange={EndEventHandler}
                      />
                      {endEventDateError && (
                        <TextError message={endEventDateError} />
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="description"
                      value={description}
                      variant="outlined"
                      onChange={(e) => setDescription(e.target.value)}
                      size="small"
                      fullWidth
                    />
                    {descriptionError && (
                      <TextError message={descriptionError} />
                    )}
                  </Box>
                  <Box >
                    <label> priority </label>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={priority || "High"}
                      onChange={(e) => setPriority(e.target.value)}
                      fullWidth
                      style={{marginTop:"10px"}}
                      size="small"
                    >
                      <MenuItem value={"High"}>High</MenuItem>
                      <MenuItem value={"Medium"}>Medium</MenuItem>
                      <MenuItem value={"Low"}>Low</MenuItem>
                    </Select>
                    {priorityError && <titleError message={priorityError} />}
                  </Box>
                  <Box>
                    <Button type="submit" onClick={() => submitHandler()}>
                      {" "}
                      submit{" "}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        );
    }
  };

  const submitHandler = async () => {
    if (validation()) {
      const data = {
        title,
        priority,
        description,
        startDate: startEventDate,
        endDate: endEventDate,
        // startDate : moment(startEventDate).format('YYYY-MM-DDThh:mm:ssTZD'),
        // endDate : moment(endEventDate).format('YYYY-MM-DDThh:mm:ssTZD')
      };

      const createApiData = await createEventApiHandler(data);
      if (createApiData.success) {
        setSuccessfullEvent(true);
        setEventStatus(1);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setErrorEvent(true);
        setEventStatus(2);
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    }
  };

  return renderTypes();
}

export default CreateEvents;
