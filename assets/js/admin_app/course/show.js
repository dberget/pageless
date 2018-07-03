import React, { Component } from "react"
import phoenixChannel from "../../socket"
import LessonList from "../../components/lessonList"
import Grid from "@material-ui/core/Grid"
import Container from "../navigation/container"

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
      <Grid container spacing={24}>
        {course.lessons.map(lesson => (
          <Grid item sm={3} md={12}>
            <LessonList lesson={lesson} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default ShowLesson
