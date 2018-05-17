import React, { Component } from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

class Menu extends Component {
  render() {
    return (
      <AppBar position="absolute" style={{ zIndex: 1500 }}>
        <Toolbar>
          <Typography
            style={{ flex: 1 }}
            variant="title"
            color="inherit"
            noWrap
          >
            Pageless
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Menu
