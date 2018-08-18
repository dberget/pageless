import React from "react"
import { withStyles } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import { CardHeader } from "@material-ui/core"

const styles = theme => ({
  card: {
    width: 550,
    margin: ".1rem auto"
  },
  title: { fontSize: "1.2rem", fontWeight: 500 },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
})

const LessonList = ({ lesson, classes }) => (
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
      <Button
        component={Link}
        to={`/lesson/${lesson.id}`}
        className={classes.button}
        variant="outlined"
      >
        Start
      </Button>
    </CardActions>
  </Card>
)
export default withStyles(styles)(LessonList)
