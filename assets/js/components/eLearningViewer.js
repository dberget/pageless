import React from "react"

const ELearningViewer = ({ lesson }) => {
  return (
    <a href={lesson.content} target="_blank">
      Launch Lesson
    </a>
  )
}

export default ELearningViewer
