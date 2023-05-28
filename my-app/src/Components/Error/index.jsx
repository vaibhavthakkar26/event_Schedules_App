import { Box, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import { style } from '../Events/CreateEvents';
import Backdrop from '@mui/material/Backdrop';

function Error({open,handleClose}) {
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
              <Typography> EVENT NOT REGISTER ! PLEASE TRY AGAIN LATER </Typography>
            </Box>
          </Fade>
        </Modal>
  )
}

export default Error
