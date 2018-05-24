import React, { Component } from "react"
import { withStyles } from "@material-ui/core"

const styles = theme => ({})

class Lesson extends Component {
  state = { lesson: {}, is_loading: true }

  componentWillMount() {
    this.getLesson(this.props.match.params.id)
  }

  getLesson = id => {
    channelGlobal.push("get_lesson", { lesson_id: id }).receive("ok", resp => {
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

export default withStyles(styles)(Lesson)
