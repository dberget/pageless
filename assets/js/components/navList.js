import React, { Component } from "react"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ViewList from "@material-ui/icons/ViewList"
import PersonIcon from "@material-ui/icons/Person"
import Drawer from "@material-ui/core/Drawer"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    width: 240
  },
  toolbar: theme.mixins.toolbar
})

class SideMenu extends Component {
  render() {
    const { classes } = this.props
    return (
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Assignments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="All Courses" />
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
