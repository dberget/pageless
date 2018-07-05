import React, { Component, Fragment } from "react"
import phoenixChannel from "../../socket"
import LessonCard from "../../components/lessonCard"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import SearchBar from "../../components/searchBar"

const styles = theme => ({
  grid: {
    margin: ".5rem 0"
  }
})

const filterTypes = [
  { value: "VIDEO", label: "Video" },
  { value: "ARTICLE", label: "Article" },
  { value: "ELEARNING", label: "eLearning" },
  { value: "OTHER", label: "Other" },
  { value: "CLASSROOM", label: "Classroom" }
]

class Index extends Component {
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
    if (filters.topic || filters.search) {
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

    if (name == "topic" && searchTerm == this.state.filters.topic) {
      searchTerm = ""
    }

    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters,
          [name]: searchTerm
        }
      }),
      () => this.handleSearch(this.state.filters)
    )
  }

  render() {
    const { lessons, is_loading, filters } = this.state
    const { classes } = this.props

    return (
      <Grid className={classes.grid} container spacing={24}>
        <SearchBar
          checked={filters.topic}
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
    )
  }
}

export default withStyles(styles)(Index)
