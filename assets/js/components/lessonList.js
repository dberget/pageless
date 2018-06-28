import React from "react"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { CardHeader } from "@material-ui/core"

const styles = theme => ({
  card: {
    width: 550,
    margin: ".5rem 0"
  },
  title: { fontSize: "1.2rem", fontWeight: 500 },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
})

const LessonList = ({ lessons, classes }) =>
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
          <CardActions className={classes.actions} disableActionSpacing />
        </Card>
      ))
    : null

export default withStyles(styles)(LessonList)
