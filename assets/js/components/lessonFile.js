import React from "react"
import Button from "@material-ui/core/Button"
import { getCsrfToken } from "../token"

// TODO
// const getLesson = id => {
//   const token = getCsrfToken()

//   fetch(`/api/download/${id}`, {
//     method: "Get",
//     credentials: "same-origin",
//     headers: {
//       "x-csrf-token": token
//     }
//   }).then(resp => console.log(resp))
// }

const LessonFile = ({ lesson }) => (
  <div>
    This is a Lesson File.
    <Button
      target="_blank"
      // onClick={() => getLesson(lesson.id)}
      href={`/uploads/${lesson.content.split("/").slice(-1)}`}
    >
      Download
    </Button>
  </div>
)

export default LessonFile
