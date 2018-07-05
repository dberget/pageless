import React, { Component } from "react"
import phoenixChannel from "../socket"

import Menu from "./navigation/menu"
import SideMenu from "./navigation/navList"

import Lesson from "./lesson/routes"
import Course from "./course/index"
import Path from "./path/index"
import Users from "./users/index"

import { withStyles } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"
import Container from "./navigation/container"
import Button from "@material-ui/core/Button"
import UserIcon from "@material-ui/icons/person"
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
  Grid
} from "@material-ui/core"

const styles = theme => ({
  "@global a": {
    textDecoration: "none"
  },
  root: {
    flexGrow: 1,
    display: "flex"
  },
  paper: {
    zIndex: 1000,
    position: "absolute",
    height: "105%",
    backgroundColor: theme.palette.secondary.light,
    width: "15%",
    top: "-5px",
    margin: ".2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    position: "relative",
    height: "5rem"
  },
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    marginLeft: 240
  },
  toolbar: theme.mixins.toolbar,
  title: { padding: 10 }
})

const Home = ({ classes }) => (
  <Container>
    <Grid container spacing={16}>
      <Grid item lg={3}>
        <div className={classes.box}>
          <Paper className={classes.paper}>
            <UserIcon />
          </Paper>
          <Paper className={classes.card} />
        </div>
      </Grid>
      <Grid item lg={3}>
        <div className={classes.box}>
          <Paper className={classes.paper}>
            <UserIcon />
          </Paper>
          <Paper className={classes.card} />
        </div>
      </Grid>
      <Grid item lg={3}>
        <div className={classes.box}>
          <Paper className={classes.paper}>
            <UserIcon />
          </Paper>
          <Paper className={classes.card} />
        </div>
      </Grid>
    </Grid>
    {/* <div>
      <Button>New Assignment</Button>
      <Button>Add User</Button>
      <Button>Create Course</Button>
    </div> */}
  </Container>
)

class App extends Component {
  state = { channel: {}, user: {} }

  componentWillMount() {
    phoenixChannel
      .join()
      .receive("ok", resp => {
        this.setState({
          user: {
            first: resp.user.first,
            last: resp.user.last,
            id: resp.user.id,
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
            <Route exact path="/" render={() => <Home classes={classes} />} />
            <Route path="/course" component={Course} />
            <Route path="/user" component={Users} />
            <Route path="/lesson" component={Lesson} />
            <Route path="/path" component={Path} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
