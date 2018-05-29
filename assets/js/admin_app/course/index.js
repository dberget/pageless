import React from "react"
import { Route, Switch, NavLink, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import SubMenu from "../navigation/subMenu"
import Container from "../navigation/container"

import New from "./new"
import View from "./show"

const CourseHome = () => (
  <div>
    Would you like to <Link to="/course/new"> create </Link> or
    <Link to="/course"> view </Link> a course?
  </div>
)

const Course = ({ match, classes }) => {
  return (
    <React.Fragment>
      <SubMenu resource="course" />
      <Container>
        <Switch>
          <Route
            exact
            path={`${match.path}/`}
            component={() => <CourseHome />}
          />
          <Route path={`${match.path}/new`} component={New} />
          <Route path={`${match.path}/:id`} component={View} />
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Course
