import React, { Component } from "react"
import phoenixChannel from "../socket"

import Menu from "./navigation/menu"
import SideMenu from "./navigation/navList"

import Lesson from "./lesson/index"
import Course from "./course/index"
import Path from "./path/index"

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
    minWidth: 0,
    marginLeft: 240
  },
  toolbar: theme.mixins.toolbar
})

class App extends Component {
  state = { channel: {}, user: {} }

  componentWillMount() {
    phoenixChannel
      .join()
      .receive("ok", resp => {
        this.setState({
          user: {
            firstName: resp.user.firstName,
            lastName: resp.user.lastName,
            id: resp.user.id,
            company_id: resp.user.company_id,
            email: resp.user.email
          }
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
            <Route exact path="/" render={() => <div>Admin Home Page</div>} />
            <Route path="/course" component={Course} />
            <Route path="/lesson" component={Lesson} />
            <Route path="/path" component={Path} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
