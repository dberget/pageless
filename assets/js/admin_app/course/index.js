import React from "react"
import { Route, Switch, Link } from "react-router-dom"

import New from "./new"
import View from "./show"

const CourseHome = () => (
  <div>
    Would you like to <Link to="/course/new"> create </Link> or
    <Link to="/course"> view </Link> a course?
  </div>
)

const Course = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/`} component={() => <CourseHome />} />
      <Route path={`${match.path}/new`} component={New} />
      <Route path={`${match.path}/:id`} component={View} />
    </Switch>
  )
}

export default Course
