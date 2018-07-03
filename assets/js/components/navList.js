import React, { Component } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PersonIcon from "@material-ui/icons/Person"
import Drawer from "@material-ui/core/Drawer"

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    width: 240
  },
  toolbar: theme.mixins.toolbar
})

class SideMenu extends Component {
  render() {
    const { classes, match } = this.props
    return (
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List component="nav">
          <ListItem button component={Link} to="/assignments">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Assignments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideMenu)
