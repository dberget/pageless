import React, { Component } from "react"
import { withStyles } from "@material-ui/core"
import phoenixChannel from "../../socket"
import LessonFile from "../../components/lessonFile"

const lessonToRender = lesson => {
  switch (lesson.source_type) {
    case "FILE":
      return <LessonFile lesson={lesson} />
    case "ELEARNING":
      return <LessonFile lesson={lesson} />
  }
}

const styles = theme => ({})

class ShowLesson extends Component {
  state = { lesson: {}, is_loading: true }

  componentDidMount() {
    this.props.lesson
      ? this.setState({ lesson: this.props.lesson, is_loading: false })
      : this.getLesson(this.props.match.params.id)
  }

  getLesson = id => {
    phoenixChannel.push("get_lesson", { lesson_id: id }).receive("ok", resp => {
      this.setState({ lesson: resp.lesson, is_loading: false })
    })
  }

  render() {
    const { classes } = this.props
    const { lesson, is_loading } = this.state

    return is_loading ? null : lessonToRender(lesson)
  }
}

export default withStyles(styles)(ShowLesson)
