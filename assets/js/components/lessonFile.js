import React from "react"
import Button from "@material-ui/core/Button"
import { getCsrfToken } from "../token"

const downloadLesson = lessonId => {
  const token = getCsrfToken()

  fetch(`/api/download/${lessonId}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "x-csrf-token": token
    }
  }).then(resp => console.log(resp))
}

const LessonFile = ({ lesson }) => (
  <div>
    This is a Lesson File.
    <Button onClick={() => downloadLesson(lesson.id)}> Download </Button>
  </div>
)

export default LessonFile
