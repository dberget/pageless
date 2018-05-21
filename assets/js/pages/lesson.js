import React, { Component } from "react"
import { withStyles } from "@material-ui/core"

const styles = theme => ({})

class Lesson extends Component {
  componentDidMount() {
    this.props.getLesson(this.props.match.params.id)
  }

  render() {
    const { classes, lesson } = this.props
    return (
      <React.Fragment>
        <div>Type: {lesson.type}</div>
        <div>Title: {lesson.title}</div>
        <div>description: {lesson.description}</div>
        <div>Content: {lesson.content}</div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Lesson)
