import React, { Component } from "react"

import Menu from "./menu"
import Lessons from "./lessons"
import LessonCard from "./lessonCard"
import SideMenu from "./navList"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
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
          <LessonCard />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
