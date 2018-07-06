import React from "react"
import Button from "@material-ui/core/Button"

const LessonFile = ({ lesson }) => (
  <div>
    This is a Lesson File.
    <Button target="_blank" href={lesson.content}>
      Download
    </Button>
    <img height="200px" src={lesson.content} />
  </div>
)

export default LessonFile
