import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import red from "@material-ui/core/colors/red"
import PlayArrow from "@material-ui/icons/PlayArrow"
import Share from "@material-ui/icons/share"
import OptionsMenu from "./optionsMenu"

const styles = {
  actions: {
    display: "flex"
  },
  title: {
    fontSize: "1rem"
  },
  h3: {
    margin: ".5rem 0 .5rem 0"
  },
  buttonRight: {
    marginLeft: "auto"
  }
}

class CourseCard extends Component {
  state = { optionsEl: null }

  handleShow = event => {
    this.setState({ optionsEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ optionsEl: null })
  }
  render() {
    const { classes, course, route } = this.props
    const { optionsEl } = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <OptionsMenu
              handleShow={this.handleShow}
              handleClose={this.handleClose}
              show={optionsEl}
            />
          }
          title={<h3 className={classes.h3}>{course.title}</h3>}
          classes={{ title: classes.title }}
        />
        <CardContent>
          <Typography component="p">{course.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            component={Link}
            to={`${route}${course.id}`}
            className={classes.buttonRight}
            color="primary"
          >
            <PlayArrow />
          </IconButton>
          <IconButton
            component={Link}
            to={`${route}${course.id}`}
            color="primary"
          >
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(CourseCard)
