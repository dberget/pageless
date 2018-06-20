import React, { Component, Fragment } from "react"
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
    const { courses, is_loading } = this.state
    const { classes } = this.props

    return (
      <Grid className={classes.grid} container spacing={24}>
        {is_loading
          ? null
          : courses.map(course => (
              <Grid key={course.id} item xs={12} md={4}>
                <CourseCard route={this.props.match.path} course={course} />
              </Grid>
            ))}
      </Grid>
    )
  }
}
const Home = withStyles(styles)(CourseHome)

const Course = ({ match, classes }) => {
  return (
    <Fragment>
      <SubMenu resource="course" />
      <Container>
        <Switch>
          <Route exact path={`${match.path}/`} component={Home} />
          <Route path={`${match.path}/new`} component={New} />
          <Route path={`${match.path}/:id`} component={View} />
        </Switch>
      </Container>
    </Fragment>
  )
}

export default Course
