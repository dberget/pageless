import React, { Fragment } from "react"
import LessonCard from "../components/lessonCard"
import { withStyles } from "@material-ui/core"

const styles = theme => ({
  container: {
    margin: "10px 0px"
  }
})

const AssignmentsList = props => {
  return props.assignments.map(assignment => (
    <div className={props.classes.container}>
      <LessonCard data={assignment} />
    </div>
  ))
}

export const Assignments = withStyles(styles)(AssignmentsList)
