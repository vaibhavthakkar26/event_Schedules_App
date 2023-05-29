import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Button, Select, TextField } from "@mui/material";
import { createEventApiHandler, editEventApiHandler, eventsDeleteById, priorityListHandler } from "../../service/api.service";
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

function CreateEvents({ open, handleClose,editEventData}) {
  const [startEventDate, setStartEventDate] = useState("");
  const [endEventDate, setEndEventDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [priorityError, setPriorityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [endEventDateError, setEndEventDateError] = useState("");
  const [startEventDateError, setStartEventDateError] = useState("");
  const [eventStatus, setEventStatus] = useState();
  const [successFullEvent, setSuccessfullEvent] = useState(false);
  const [errorEvent, setErrorEvent] = useState(false);
  const [priorityList,setPriorityList] = useState([]);

  const startEventHandler = (date) => {
    setStartEventDate(date);
  };

  useEffect(()=>{
    editDataHandler();
    priorityListData();
  },[editEventData]);

  const priorityListData = async() =>{
    const result = await priorityListHandler();
    setPriorityList(result.data);
  };


  const eventDeleteHandler = async (id) =>{
     const response = await eventsDeleteById(id);
     if(response.success){
      handleClose();
     }
  }

  const editDataHandler = () =>{
    if(editEventData){
      setDescription(editEventData.description);
      setPriority(editEventData.priorityName);
      setTitle(editEventData.title);
      setEndEventDate(new Date(editEventData.endDate));
      setStartEventDate(new Date(editEventData.startDate));
    }
  }

  const EndEventHandler = (date) => {
    setEndEventDate(date);
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
    // if (!priority) {
    //   setPriorityError("please select priority");
    //   validate = false;
    // }
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
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      fullWidth
                      style={{marginTop:"10px"}}
                      size="small"
                    >
                      {
                        priorityList?.map((res)=>(
                          <MenuItem value={res.name} key={`p_${res.name}`}>{res.name}</MenuItem>
                        ))
                      }
                     </Select>
                    {priorityError && <TextError message={priorityError} />}
                  </Box>
                  <Box>
                    <Button type="submit" variant="outlined" onClick={() => submitHandler()}>
                      submit
                    </Button>
                    {
                      editEventData && 
                            <Button onClick={() =>eventDeleteHandler(editEventData.id)}> Delete </Button>
                    }
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
      };

      if(editEventData){
        const eventsData =  await editEventApiHandler(editEventData.id,data);
        if (eventsData.success) {
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
      }else{
        const eventsData = await createEventApiHandler(data);
        if (eventsData.success) {
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

    }
  };

  return renderTypes();
}

export default CreateEvents;
