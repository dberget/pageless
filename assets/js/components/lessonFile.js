import React from "react"
import Button from "@material-ui/core/Button"

const LessonFile = ({ lesson }) => (
  <div>
    This is a Lesson File.
    <Button
      target="_blank"
      href={`/uploads/${lesson.content.split("/").slice(-1)}`}
    >
      Download
    </Button>
  </div>
)

export default LessonFile
