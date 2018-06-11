import React, { Component, Fragment } from "react"
import LessonStepper from "./lessonStepper"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import red from "@material-ui/core/colors/red"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import lessonStepper from "./lessonStepper"
import Chip from "@material-ui/core/Chip"
import { Divider } from "@material-ui/core"

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  chip: {
    backgroundColor: red[500],
    color: "white"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  title: {
    fontSize: "1rem"
  },
  stats: {
    borderLeftStyle: "solid",
    borderLeft: 1,
    display: "inline",
    color: "inherit",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  h3: {
    margin: ".5rem 0 .5rem 0"
  },
  button: { padding: "inherit" }
})

class LessonCard extends Component {
  render() {
    const { classes, lesson, route } = this.props
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <Fragment>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Fragment>
            }
            title={<h3 className={classes.h3}>{lesson.title}</h3>}
            subheader={<div> {lesson.type} </div>}
            classes={{ title: classes.title }}
          />
          <CardContent>
            <Typography component="p">{lesson.description}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              component={Link}
              to={`${route}${lesson.id}`}
              className={classes.button}
              variant="raised"
              color="primary"
            >
              View Lesson
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(LessonCard)
