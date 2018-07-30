import React from "react"
import ReadOnly from "./textEditor/readOnly"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  textContainer: {
    paddingTop: "3rem",
    width: 800
  }
})

const RichTextViewer = ({ classes, lesson }) => {
  return (
    <div className={classes.textContainer}>
      <ReadOnly value={lesson.text} />
    </div>
  )
}

export default withStyles(styles)(RichTextViewer)
