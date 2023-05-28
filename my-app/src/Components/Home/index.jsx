import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateEvents from '../Events/CreateEvents';
function Home() {
  const [modelOpen,setModalOpen] = useState(false);

  const CloseHandler = () =>{
    setModalOpen(!modelOpen);
  }

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
