import React, { Component } from "react"
import LessonFile from "./lessonFile"
import ELearningViewer from "./eLearningViewer"
import LessonRichText from "./lessonRichText"
import VideoViewer from "./videoViewer"

const renderLesson = lesson => {
  switch (lesson.source_type) {
    case "FILE":
      return <LessonFile lesson={lesson} />
    case "TEXT":
      return <LessonRichText lesson={lesson} />
    case "URL":
      return handleUrl(lesson)
    default:
      return <div>error with lesson source</div>
  }
}

const handleUrl = lesson => {
  switch (lesson.lesson_type) {
    case "ELEARNING":
      return <ELearningViewer lesson={lesson} />
    case "VIDEO":
      return <VideoViewer lesson={lesson} />
    default:
      return <div>error in lesson url or type</div>
  }
}

export default renderLesson
