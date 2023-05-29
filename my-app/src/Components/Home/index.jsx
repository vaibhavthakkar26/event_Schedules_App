import React, { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateEvents from '../Events/CreateEvents';
import { ListEventApiHandler,getListById } from '../../service/api.service';
import EventsCalender from '../EventsCalender';
import { Box } from '@mui/material';

function Home() {
  const [modelOpen,setModalOpen] = useState(false);
  const [eventsList,setEventsList] = useState([]);
  const [editEventData,setEditEventData] = useState();

  const CloseHandler = () =>{
    setModalOpen(!modelOpen);
    setEditEventData(null);
    eventListHandler();
  }

  useEffect(()=>{
    eventListHandler();
  },[]);

  const eventListHandler = async () => {
    const eventsData = await ListEventApiHandler();
    if(eventsData.success){
      const ActiveEventsData = eventsData.data.filter((res) =>res.isActive === true);
      setEventsList(ActiveEventsData);
    }
  };

  

  const editEventsListHandler = async (id) =>{
    const dataById = await getListById(id);
    setModalOpen(true);
    setEditEventData(dataById.data);
  }

  return (
    <div>
      <Box textAlign={"end"} margin={"10px 2px"}>
      <Button variant="outlined" color='primary' startIcon={<AddIcon/>} onClick={()=>setModalOpen(true)}>
        create events
      </Button>
      </Box>
      {
        modelOpen && <CreateEvents open={modelOpen} handleClose={CloseHandler} editEventData={editEventData}/>
      }
      <EventsCalender  eventsList={eventsList} editEventsHandler={editEventsListHandler} />
    </div>
  )
}

export default Home
