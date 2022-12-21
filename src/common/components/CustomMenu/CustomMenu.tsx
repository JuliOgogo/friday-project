import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import { ListItemIcon, ListItemText, Paper, MenuItem, Menu } from '@mui/material'
import IconButton from '@mui/material/IconButton'

export const CustomMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} disableRipple>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText>Learn</ListItemText>
          </MenuItem>
        </Menu>
      </Paper>
    </div>
  )
}
