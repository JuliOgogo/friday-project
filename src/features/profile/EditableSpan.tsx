import React, { ChangeEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div>
      <TextField
        variant="standard"
        label={'Nickname'}
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
      />
      <Button variant="contained">Save</Button>
    </div>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  )
})
