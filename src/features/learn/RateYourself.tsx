import React from 'react'

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

type RateYourselfType = {
  setIsAnswered: (isAnswered: boolean) => void
}

export const RateYourself = (props: RateYourselfType) => {
  const onClickHandler = (value: boolean) => {
    props.setIsAnswered(value)
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Knew the answer"
          name="radio-buttons-group"
        >
          <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />
          <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
          <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
          <FormControlLabel value="Сonfused" control={<Radio />} label="Сonfused" />
          <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        sx={{
          width: '373px',
          borderRadius: '50px',
          marginTop: '20px',
        }}
        onClick={() => onClickHandler(false)}
      >
        Next
      </Button>
    </div>
  )
}
