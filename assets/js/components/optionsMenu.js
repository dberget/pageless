import React, { Fragment } from "react"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const OptionsMenu = ({ handleShow, handleClose, show }) => {
  return (
    <Fragment>
      <IconButton
        onClick={handleShow}
        aria-owns={show ? "simple-menu" : null}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={show}
        open={Boolean(show)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={handleClose}>Preview</MenuItem>
      </Menu>
    </Fragment>
  )
}

export default OptionsMenu
