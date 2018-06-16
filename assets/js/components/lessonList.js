import React from "react"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { CardHeader, Grid } from "@material-ui/core"
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

const LessonList = ({ lessons, classes, handleRemove, handlePreview }) =>
  lessons
    ? lessons.map(lesson => (
        <Card key={lesson.id} className={classes.card}>
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
            <IconButton
              onClick={() => (handlepreview ? handlePreview(lesson) : null)}
              aria-label="Preview Lesson"
            >
              <PageViewOutline />
            </IconButton>
            <IconButton
              onClick={() => (handleRemove ? handleRemove(lesson) : null)}
              aria-label="Remove Lesson"
            >
              <RemoveCircleOutline />
            </IconButton>
          </CardActions>
        </Card>
      ))
    : null

export default withStyles(styles)(LessonList)
