import React from "react"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  card: {
    minWidth: 400,
    margin: ".5rem 0px",
    position: "relative"
  }
})

const LessonList = ({ lessons, classes }) =>
  lessons
    ? lessons.map(lesson => (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="h2">
              {lesson.title}
            </Typography>
            <Typography variant="headline" component="h2">
              {lesson.type}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {lesson.description}
            </Typography>
            <Typography component="p">{lesson.content}</Typography>
          </CardContent>
        </Card>
      ))
    : null

export default withStyles(styles)(LessonList)
