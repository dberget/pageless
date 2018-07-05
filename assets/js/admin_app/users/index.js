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

class UsersHome extends Component {
  state = { users: [], is_loading: true }

  componentDidMount = () => {
    // phoenixChannel.push("get_company_courses").receive("ok", resp => {
    //   this.setState({ courses: resp.courses, is_loading: false })
    // })
  }

  render() {
    const { users } = this.state
    const { classes } = this.props

    return <div>users home</div>
  }
}

const Users = ({ match, classes }) => {
  return (
    <Fragment>
      <SubMenu resource="user" />
      <Container>
        <Switch>
          <Route
            exact
            path={`${match.path}/`}
            component={withStyles(styles)(UsersHome)}
          />
          <Route path={`${match.path}/new`} component={New} />
          <Route path={`${match.path}/:id`} component={View} />
        </Switch>
      </Container>
    </Fragment>
  )
}

export default Users
