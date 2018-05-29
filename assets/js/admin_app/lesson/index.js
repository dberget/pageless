import React, { Component } from "react"
import { Route, Switch, Link, NavLink } from "react-router-dom"
import phoenixChannel from "../../socket"
import NewLesson from "./new"
import ViewLesson from "./show"
import LessonCard from "../../components/lessonCard"
import Container from "../navigation/container"
import SubMenu from "../navigation/subMenu"
import Grid from "@material-ui/core/Grid"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  card: {
    margin: "3px"
  },
  grid: {
    margin: "1rem 0"
  }
})

class Home extends Component {
  state = { lessons: [], is_loading: true }
  componentDidMount = () => {
    phoenixChannel
      .push("get_company_lessons", { company_id: 1 })
      .receive("ok", resp => {
        this.setState({ lessons: resp.lessons, is_loading: false })
      })
  }

  render() {
    const { lessons } = this.state
    const { classes } = this.props

    return (
      <Grid className={classes.grid} alignItems={"stretch"} container>
        {this.state.lessons.map(lesson => (
          <div className={classes.card}>
            <LessonCard route={this.props.match.path} lesson={lesson} />
          </div>
        ))}
      </Grid>
    )
  }
}

const Lesson = ({ classes, match }) => {
  return (
    <React.Fragment>
      <SubMenu resource="lesson" />
      <Container>
        <Switch>
          <Route
            exact
            path={`${match.path}/`}
            component={withStyles(styles)(Home)}
          />
          <Route path={`${match.path}/new`} component={NewLesson} />
          <Route path={`${match.path}/:id`} component={ViewLesson} />
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Lesson
