import React, { Component } from "react"

import Menu from "../components/menu"
import LessonCard from "../components/lessonCard"
import SideMenu from "../components/navList"

import { Home } from "./home"
import { AllCourses } from "./allCourses"
import { Assignments } from "./assignments"
import Lesson from "./lesson"
import Course from "./course"

import { withStyles } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"

const styles = theme => ({
  "@global a": {
    textDecoration: "none"
  },
  root: {
    flexGrow: 1,
    overflow: "hidden",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    marginLeft: 240
  },
  toolbar: theme.mixins.toolbar
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Menu />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/" component={Home} />
          <Route path="/lesson" component={Lesson} />
          <Route path="/assignments" component={Assignments} />
          <Route path="/courses" component={AllCourses} />
          <Route path="/course" component={Course} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
