import React, { Component } from "react"
import { withStyles } from "@material-ui/core"
import phoenixChannel from "../../socket"

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

    return (
      <React.Fragment>
        {is_loading ? null : (
          <div>
            <div>Type: {lesson.type}</div>
            <div>Title: {lesson.title}</div>
            <div>description: {lesson.description}</div>
            <div>Content: {lesson.content}</div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ShowLesson)
