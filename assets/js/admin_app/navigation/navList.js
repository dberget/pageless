import React, { Component } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ViewList from "@material-ui/icons/ViewList"
import Drawer from "@material-ui/core/Drawer"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import Build from "@material-ui/icons/Build"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Dashboard from "@material-ui/icons/dashboard"
import ViewModule from "@material-ui/icons/ViewModule"
import Person from "@material-ui/icons/person"
import Pages from "@material-ui/icons/pages"

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    width: 240
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class SideMenu extends Component {
  state = { lessonOpen: false, courseOpen: false }

  handleLessonClick = () => {
    this.setState({ lessonOpen: !this.state.lessonOpen })
  }

  handleCourseClick = () => {
    this.setState({ courseOpen: !this.state.courseOpen })
  }

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
          <ListItem button component={Link} to="/user">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={this.handleCourseClick}>
            <ListItemIcon>
              <Pages />
            </ListItemIcon>
            <ListItemText inset primary="Courses" />
            {this.state.courseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.courseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/course"
                className={classes.nested}
              >
                <ListItemIcon>
                  <ViewModule />
                </ListItemIcon>
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/course/new"
                className={classes.nested}
              >
                <ListItemIcon>
                  <Build />
                </ListItemIcon>
                <ListItemText inset primary="Create" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={this.handleLessonClick}>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText inset primary="Lessons" />
            {this.state.lessonOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.lessonOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/lesson"
                className={classes.nested}
              >
                <ListItemIcon>
                  <ViewModule />
                </ListItemIcon>
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/lesson/new"
                className={classes.nested}
              >
                <ListItemIcon>
                  <Build />
                </ListItemIcon>
                <ListItemText inset primary="Create" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideMenu)
