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
  state = { lessons: [], is_loading: true, filters: { search: "", topic: "" } }

  componentDidMount = () => {
    this.getInitialLessons()
  }

  getInitialLessons = () => {
    phoenixChannel.push("get_company_lessons").receive("ok", resp => {
      this.setState({ lessons: resp.lessons, is_loading: false })
    })
  }

  handleSearch = filters => {
    if (filters.search.length > 2) {
      this.fetchResults(filters)
    } else {
      this.getInitialLessons()
    }
  }

  fetchResults({ search, topic }) {
    phoenixChannel
      .push("search_company_lessons", { search, topic })
      .receive("ok", resp => {
        this.setState({ lessons: resp.lessons })
      })
  }

  handleChange = name => event => {
    let searchTerm = event.target.value

    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters,
          [name]: searchTerm
        }
      }),
      this.handleSearch(this.state.filters)
    )
  }

  render() {
    const { lessons, is_loading } = this.state
    const { classes } = this.props

    return (
      <Fragment>
        <Grid container spacing={24}>
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
