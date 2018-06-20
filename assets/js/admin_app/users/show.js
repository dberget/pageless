import React, { Component } from "react"
import phoenixChannel from "../../socket"
import LessonList from "../../components/lessonList"
import Grid from "@material-ui/core/Grid"

class ShowLesson extends Component {
  state = { course: {}, is_loading: true }

  componentDidMount() {
    this.props.course
      ? this.setState({ course: this.props.course, is_loading: false })
      : this.getCourse(this.props.match.params.id)
  }

  getCourse = id => {
    phoenixChannel.push("get_course", { course_id: id }).receive("ok", resp => {
      this.setState({ course: resp.course, is_loading: false })
    })
  }

  render() {
    const { course, is_loading } = this.state

    return is_loading ? null : (
      <Grid item="xs">
        <LessonList lessons={course.lessons} />
      </Grid>
    )
  }
}

export default ShowLesson
