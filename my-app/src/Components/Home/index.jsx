import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
function Home() {
  return (
    <div>
      <Button variant="outlined" startIcon={<AddIcon/>}>
        create events
      </Button>
    </div>
  )
}

export default Home
