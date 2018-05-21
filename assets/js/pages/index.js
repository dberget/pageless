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
  state = { channel: {}, user: {}, paths: [], lessons: [], lesson: {} }

  componentWillMount() {
    let channel = socket.channel(`user: ${window.userToken}`, {})
    this.setState({ channel: channel })

    channel
      .join()
      .receive("ok", resp => {
        this.setState({
          user: {
            firstName: resp.user.firstName,
            lastName: resp.user.lastName,
            id: resp.user.id,
            email: resp.user.email
          },
          paths: resp.user.paths
        })
      })
      .receive("error", resp => {
        console.log("Unable to join", resp)
      })
  }

  getLessons = id => {
    this.state.channel
      .push("get_lessons", { path_id: id })
      .receive("ok", resp => {
        this.setState({ lessons: resp.lessons })
      })
  }

  getLesson = id => {
    this.state.channel
      .push("get_lesson", { lesson_id: id })
      .receive("ok", resp => {
        this.setState({ lesson: resp.lesson })
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
          <Route
            path="/app/assignments"
            render={routeprops => (
              <Assignments {...routeprops} assignments={this.state.paths} />
            )}
          />
          <Route
            path="/app/course/:id"
            render={routeprops => (
              <Course
                {...routeprops}
                getLessons={this.getLessons}
                lessons={this.state.lessons}
              />
            )}
          />
          <Route
            path="/app/lesson/:id"
            render={routeprops => (
              <Lesson
                {...routeprops}
                getLesson={this.getLesson}
                lesson={this.state.lesson}
              />
            )}
          />
          <Route path="/app/courses" component={AllCourses} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
