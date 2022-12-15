import React, { ChangeEvent, useState } from 'react'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { Button, TextField } from '@mui/material'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)
  let [error, setError] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value

    if (newValue.trim() === '' || newValue.trim().length > 20) {
      setError(true)
    } else {
      setError(false)
    }
    setTitle(newValue)
  }

  return editMode ? (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          variant="standard"
          label={'Nickname'}
          value={title}
          onChange={changeTitle}
          autoFocus
        />
        <Button variant="contained" onClick={activateViewMode} disabled={error}>
          Save
        </Button>
      </div>
      {error && <span style={{ color: 'red', fontSize: '15px' }}>bad name</span>}
    </div>
  ) : (
    <div>
      <span>{props.value}</span>
      <BorderColorOutlinedIcon
        color="action"
        sx={{ marginLeft: '5px', fontSize: '20px' }}
        onClick={activateEditMode}
      />
    </div>
  )
}
