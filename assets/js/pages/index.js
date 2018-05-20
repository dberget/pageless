import React, { Component } from "react"
import socket from "../socket.js"

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
  state = { user: {} }

  componentDidMount() {
    let channel = socket.channel(`user: ${window.userToken}`, {})
    this.setState({ channel: channel })

    channel
      .join()
      .receive("ok", resp => {
        this.setState({ user: resp.user })
      })
      .receive("error", resp => {
        console.log("Unable to join", resp)
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Menu user={this.state.user} />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/app" component={Home} />
          <Route path="/app/lesson" component={Lesson} />
          <Route path="/app/assignments" component={Assignments} />
          <Route path="/app/courses" component={AllCourses} />
          <Route path="/app/course" component={Course} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
