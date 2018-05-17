import React, { Component } from "react"

import Menu from "../components/menu"
import Lessons from "../components/lessons"
import LessonCard from "../components/lessonCard"
import SideMenu from "../components/navList"

import { Home } from "./home"
import { AllCourses } from "./courses"

import { withStyles } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"

const styles = theme => ({
  "@global a": {
    textDecoration: "none"
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
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
          <Route path="/lessons" component={LessonCard} />
          <Route path="/courses" component={AllCourses} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
