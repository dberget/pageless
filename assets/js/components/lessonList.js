import React from "react"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline"
import PageViewOutline from "@material-ui/icons/PageView"
import IconButton from "@material-ui/core/IconButton"

const styles = theme => ({
  card: {
    width: 550,
    margin: ".5rem 0px"
  },
  title: { fontSize: "1.2rem", fontWeight: 500 },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
})

const LessonList = ({ lessons, classes }) =>
  lessons
    ? lessons.map((lesson, index) => (
        <Card className={classes.card}>
          <CardHeader
            classes={{ title: classes.title }}
            title={lesson.title}
            action={<Typography>{lesson.type}</Typography>}
          />
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {lesson.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Preview Lesson">
              <PageViewOutline />
            </IconButton>
            <IconButton aria-label="Remove Lesson">
              <RemoveCircleOutline color="red" />
            </IconButton>
          </CardActions>
        </Card>
      ))
    : null

export default withStyles(styles)(LessonList)
