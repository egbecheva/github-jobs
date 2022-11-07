import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FullTimeCheckBox: React.FC<{onlyFullTimeJobsVisible:string, handleFullTimeCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void}> = ({onlyFullTimeJobsVisible,handleFullTimeCheckBox}) => {

  return (
    <FormControlLabel
    control={
      <Checkbox
       checked={JSON.parse(onlyFullTimeJobsVisible)}
       onChange={
        (event)=>{handleFullTimeCheckBox(event)}
      }  />
    }
    label="Full time"
  />
  )
}

export default FullTimeCheckBox;
