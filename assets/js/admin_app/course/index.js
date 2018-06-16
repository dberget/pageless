import React, { Component } from "react"
import SubMenu from "../navigation/subMenu"
import phoenixChannel from "../../socket"
import { Route, Switch, Link } from "react-router-dom"
import Container from "../navigation/container"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import CourseCard from "../../components/courseCard"

import New from "./new"
import View from "./show"

const styles = theme => ({
  card: {
    margin: "3px"
  },
  grid: {
    margin: "1rem 0"
  }
})

class CourseHome extends Component {
  state = { courses: [], is_loading: true }

  componentDidMount = () => {
    phoenixChannel.push("get_company_courses").receive("ok", resp => {
      this.setState({ courses: resp.courses, is_loading: false })
    })
  }

  render() {
    const { courses } = this.state
    const { classes } = this.props

    return (
      <Grid className={classes.grid} container spacing={24}>
        {courses.map(course => (
          <div className={classes.card}>
            <Grid item xs>
              <CourseCard route={this.props.match.path} course={course} />
            </Grid>
          </div>
        ))}
      </Grid>
    )
  }
}

const Course = ({ match, classes }) => {
  return (
    <React.Fragment>
      <SubMenu resource="course" />
      <Container>
        <Switch>
          <Route
            exact
            path={`${match.path}/`}
            component={withStyles(styles)(CourseHome)}
          />
          <Route path={`${match.path}/new`} component={New} />
          <Route path={`${match.path}/:id`} component={View} />
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Course
