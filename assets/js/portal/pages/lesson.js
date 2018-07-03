import React, { Component } from "react"
import { withStyles } from "@material-ui/core"
import phoenixChannel from "../../socket"
import renderLesson from "../../components/renderLesson"

const styles = theme => ({})

class Lesson extends Component {
  state = { lesson: {}, is_loading: true }

  componentWillMount() {
    this.getLesson(this.props.match.params.id)
  }

  getLesson = id => {
    phoenixChannel.push("get_lesson", { lesson_id: id }).receive("ok", resp => {
      this.setState({ lesson: resp.lesson, is_loading: false })
    })
  }

  render() {
    const { lesson, is_loading } = this.state

    return is_loading ? null : renderLesson(lesson)
  }
}

export default withStyles(styles)(Lesson)
