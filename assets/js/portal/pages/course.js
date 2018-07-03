import React, { Component } from "react"
import phoenixChannel from "../../socket"
import LessonList from "../../components/lessonList"
import Grid from "@material-ui/core/Grid"

class Course extends Component {
  state = { course: {}, is_loading: true }

  componentDidMount() {
    this.getCourse(this.props.match.params.courseSlug)
  }

  getCourse = slug => {
    phoenixChannel.push("get_course", { slug: slug }).receive("ok", resp => {
      this.setState({ course: resp.course, is_loading: false })
    })
  }

  render() {
    const { course, is_loading } = this.state

    return is_loading ? null : (
      <Grid container spacing={24}>
        {course.lessons.map(lesson => (
          <Grid item md={12}>
            <LessonList lesson={lesson} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Course
