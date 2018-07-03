import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Assessment from "@material-ui/icons/Assessment"
import OptionsMenu from "./optionsMenu"

const styles = {
  root: {},
  actions: {
    display: "flex"
  },
  title: {
    fontSize: "1rem"
  },
  content: {
    overflow: "scroll",
    height: "4rem"
  },
  buttonRight: { marginLeft: "auto" }
}

class LessonCard extends Component {
  state = { optionsEl: null }

  handleShow = event => {
    this.setState({ optionsEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ optionsEl: null })
  }
  render() {
    const { classes, lesson, route } = this.props
    const { optionsEl } = this.state
    return (
      <div>
        <Card classes={{ root: classes.root }}>
          <CardHeader
            action={
              <OptionsMenu
                handleShow={this.handleShow}
                handleClose={this.handleClose}
                show={optionsEl}
              />
            }
            title={
              <Typography variant="title" noWrap className={classes.title}>
                {lesson.title}
              </Typography>
            }
            subheader={<div> {lesson.type} </div>}
          />
          <CardContent classes={{ root: classes.content }}>
            <Typography component="p">{lesson.description}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              component={Link}
              to={`${route}${lesson.id}`}
              className={classes.button}
              variant="outlined"
              color="secondary"
            >
              View
            </Button>
            <IconButton
              component={Link}
              to={`${route}${lesson.id}`}
              className={classes.buttonRight}
              color="primary"
            >
              <Assessment />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(LessonCard)
