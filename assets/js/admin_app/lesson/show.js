import { Component } from "react"
import phoenixChannel from "../../socket"
import renderLesson from "../../components/renderLesson"

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
    const { lesson, is_loading } = this.state

    return is_loading ? null : renderLesson(lesson)
  }
}

export default ShowLesson
