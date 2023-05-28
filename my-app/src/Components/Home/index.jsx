import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateEvents from '../Events/CreateEvents';
import { ListEventApiHandler } from '../../service/api.service';
function Home() {
  const [modelOpen,setModalOpen] = useState(false);
  const [eventsList,setEventsList] = useState([]);

  const CloseHandler = () =>{
    setModalOpen(!modelOpen);
  }

  useEffect(()=>{
    eventListHandler();
    // const eventsData = 
  },[]);

  const eventListHandler = async () =>{
    const eventsData = await ListEventApiHandler();
    if(eventsData.success){
      console.log("data",eventsData.data);
      setEventsList(eventsData.data);
    }
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<AddIcon/>} onClick={()=>setModalOpen(true)}>
        create events
      </Button>
      {
        modelOpen && <CreateEvents open={modelOpen} handleClose={CloseHandler}/>
      }
    </div>
  )
}

export default Home
