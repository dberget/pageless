import React from "react"
import { Route, Switch, Link } from "react-router-dom"
import Container from "../navigation/container"
import SubMenu from "../navigation/subMenu"

import New from "./new"
import View from "./show"

const Home = () => (
  <div>
    Would you like to <Link to="/path/new"> create </Link> or
    <Link to="/path"> view </Link> a path?
  </div>
)

const Path = ({ match }) => {
  return (
    <React.Fragment>
      <SubMenu resource="path" />
      <Container>
        <Switch>
          <Route exact path={`${match.path}/`} component={() => <Home />} />
          <Route path={`${match.path}/new`} component={New} />
          <Route path={`${match.path}/:id`} component={View} />
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Path
