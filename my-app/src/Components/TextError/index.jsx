import { Typography } from '@mui/material'
import React from 'react'

function TextError({message}) {
  return (
    <div>
        <Typography style={{color:"red" }}>{message}</Typography>
    </div>
  )
}

export default TextError
