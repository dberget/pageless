import React, { Component } from "react"
import phoenixChannel from "../../socket"

import Menu from "../../components/menu"
import SideMenu from "../../components/navList"

import { Home } from "./home"
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
    phoenixChannel
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

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Menu user={this.state.user} />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/assignments" component={Assignments} />
            <Route path="/lesson/:id" component={Lesson} />
            <Route path="/:courseSlug" component={Course} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
