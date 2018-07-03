import React, { Component, Fragment } from "react"
import { Route, Switch, Link, NavLink } from "react-router-dom"
import phoenixChannel from "../../socket"
import NewLesson from "./new"
import ViewLesson from "./show"
import LessonCard from "../../components/lessonCard"
import Container from "../navigation/container"
import SubMenu from "../navigation/subMenu"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import SearchBar from "../../components/searchBar"

const styles = theme => ({
  grid: {
    margin: "1rem 0"
  }
})

const filterTypes = [
  { value: "VIDEO", label: "Video" },
  { value: "ARTICLE", label: "Article" },
  { value: "ELEARNING", label: "eLearning" },
  { value: "OTHER", label: "Other" },
  { value: "CLASSROOM", label: "Classroom" }
]

class Home extends Component {
  state = { lessons: [], is_loading: true }

  componentDidMount = () => {
    this.getInitialLessons()
  }

  getInitialLessons = () => {
    phoenixChannel.push("get_company_lessons").receive("ok", resp => {
      this.setState({ lessons: resp.lessons, is_loading: false })
    })
  }

  handleSearch = searchTerm => {
    if (searchTerm.length > 2) {
      this.fetchResults(searchTerm)
    } else {
      this.getInitialLessons()
    }
  }

  fetchResults(query) {
    phoenixChannel
      .push("search_company_lessons", { query: query })
      .receive("ok", resp => {
        this.setState({ lessons: resp.lessons })
      })
  }

  handleChange = name => event => {
    event.preventDefault()
    const searchTerm = event.target.value.trim()
    this.handleSearch(searchTerm)

    this.setState({
      ...this.state,
      filter: {
        [name]: searchTerm
      }
    })
  }

  render() {
    const { lessons, is_loading } = this.state
    const { classes } = this.props

    return (
      <Fragment>
        <Grid className={classes.grid} container spacing={24}>
          <SearchBar
            filterTypes={filterTypes}
            handleChange={this.handleChange}
          />
          {is_loading
            ? null
            : lessons.map(lesson => (
                <Grid key={lesson.id} item sm={12} md={6} lg={3}>
                  <LessonCard route={this.props.match.path} lesson={lesson} />
                </Grid>
              ))}
        </Grid>
      </Fragment>
    )
  }
}

const Lesson = ({ classes, match }) => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default Lesson
