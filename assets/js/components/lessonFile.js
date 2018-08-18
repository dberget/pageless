import React from "react"
import Button from "@material-ui/core/Button"

const LessonFile = ({ lesson }) => (
  <div>
    <Button target="_blank" href={lesson.content}>
      Download File
    </Button>
    <img height="200px" src={lesson.content} />
  </div>
)

export default LessonFile
