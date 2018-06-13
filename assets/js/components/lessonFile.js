import React from "react"
import Button from "@material-ui/core/Button"
import { getCsrfToken } from "../token"

const downloadLesson = id => {
  const token = getCsrfToken()
  let url

  fetch(`/api/download/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "x-csrf-token": token
    }
  }).then(resp => resp.blob())
}

const LessonFile = ({ lesson }) => (
  <div>
    This is a Lesson File.
    <Button
      href={`/uploads/${lesson.content.split("/").slice(-1)}`}
      onClick={() => downloadLesson(lesson.id)}
    >
      {" "}
      Download{" "}
    </Button>
  </div>
)

export default LessonFile
