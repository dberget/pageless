import React, { Component } from "react"
import phoenixChannel from "../../socket"
import LessonFile from "../../components/lessonFile"
import ELearningViewer from "../../components/eLearningViewer"
import LessonRichText from "../../components/lessonRichText"
import VideoViewer from "../../components/videoViewer"

const lessonToRender = lesson => {
  switch (lesson.source_type) {
    case "FILE":
      return <LessonFile lesson={lesson} />
    case "TEXT":
      return <LessonRichText lesson={lesson} />
    case "URL":
      return handleUrl(lesson)
  }
}

const handleUrl = lesson => {
  switch (lesson.lesson_type) {
    case "ELEARNING":
      return <ELearningViewer lesson={lesson} />
    case "VIDEO":
      return <VideoViewer lesson={lesson} />
  }
}

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

    return is_loading ? null : lessonToRender(lesson)
  }
}

export default ShowLesson
