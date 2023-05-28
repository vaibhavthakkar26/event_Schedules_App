import { Box, Fade, Modal, Typography } from '@mui/material';
import React from 'react'
import { style } from '../Events/CreateEvents';
import Backdrop from '@mui/material/Backdrop';

function SuccessFull({open,handleClose}) {
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
          <Fade in={true}>
            <Box sx={style}>
              <Typography> EVENT REGISTER SUCCESSFULLY </Typography>
            </Box>
          </Fade>
        </Modal>
  )
}

export default SuccessFull
