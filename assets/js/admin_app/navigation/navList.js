import React, { Component } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import ViewList from "@material-ui/icons/ViewList"
import Drawer from "@material-ui/core/Drawer"

import ListItemIcon from "@material-ui/core/ListItemIcon"
import Dashboard from "@material-ui/icons/dashboard"
import Work from "@material-ui/icons/work"
import Person from "@material-ui/icons/person"
import Pages from "@material-ui/icons/pages"

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
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/lesson">
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Lesson" />
          </ListItem>
          <ListItem button component={Link} to="/course">
            <ListItemIcon>
              <Pages />
            </ListItemIcon>
            <ListItemText primary="Course" />
          </ListItem>
          <ListItem button component={Link} to="/path">
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Path" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideMenu)
