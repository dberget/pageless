import React, { Fragment } from "react"
import { Route, Switch, Link, NavLink } from "react-router-dom"
import NewLesson from "./new"
import ViewLesson from "./show"
import Container from "../navigation/container"
import SubMenu from "../navigation/subMenu"
import Index from "./index"
import TextEditor from "../../components/textEditor/textEditor"

const Lesson = ({ match }) => {
  return (
    <Fragment>
      <SubMenu resource="lesson" />
      <Container>
        <Switch>
          <Route exact path={`${match.path}/`} component={Index} />
          <Route exact path={`${match.path}/new`} component={NewLesson} />
          <Route path={`${match.path}/new/text`} component={TextEditor} />
          <Route path={`${match.path}/:id`} component={ViewLesson} />
        </Switch>
      </Container>
    </Fragment>
  )
}

export default Lesson
