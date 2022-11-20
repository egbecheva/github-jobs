import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


    const PreDefinedCountries:
     React.FC<{
      handleCountryChange: (event: React.ChangeEvent<HTMLInputElement>) => void}> =
      ({handleCountryChange}) => {

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleCountryChange}
      >
        <FormControlLabel value="UK" control={<Radio />} label="UK" />
        <FormControlLabel value="USA" control={<Radio />} label="USA" />
        <FormControlLabel value="Japan" control={<Radio />} label="Japan" />
        <FormControlLabel value="Canada" control={<Radio />} label="Canada" />
      </RadioGroup>
    </FormControl>
  );
}

export default PreDefinedCountries