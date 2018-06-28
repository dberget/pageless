import React, { Component } from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  marginAuto: {
    marginRight: "auto"
  }
})

class Menu extends Component {
  render() {
    const { classes, user } = this.props
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.marginAuto}
            variant="title"
            color="inherit"
            noWrap
            component={Link}
            to="/"
          >
            Pageless
          </Typography>
          <Typography color="inherit">
            {user.first} {user.last}
          </Typography>
          <Button href="/logout" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Menu)
