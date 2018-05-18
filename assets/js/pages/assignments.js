import React, { Fragment } from "react"
import LessonCard from "../components/lessonCard"
import { withStyles } from "@material-ui/core"

const assignments = [1, 2, 3, 4, 5]

const styles = theme => ({
  container: {
    margin: "10px 0px"
  }
})

const AssignmentsList = props => {
  return assignments.map(assignment => (
    <div className={props.classes.container}>
      <LessonCard />
    </div>
  ))
}

export const Assignments = withStyles(styles)(AssignmentsList)
