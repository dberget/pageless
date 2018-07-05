import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import PlayArrow from "@material-ui/icons/PlayArrow"
import Share from "@material-ui/icons/share"
import FileCopy from "@material-ui/icons/ContentCopy"
import Modal from "@material-ui/core/Modal"
import Paper from "@material-ui/core/Paper"
import OptionsMenu from "./optionsMenu"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import MessageSnackbar from "./snackbar"

const styles = theme => ({
  actions: {
    display: "flex"
  },
  title: {
    fontSize: "1.2rem",
    margin: ".5rem 0 .5rem 0",
    fontWeight: "500"
  },
  buttonRight: {
    marginLeft: "auto"
  },
  modalBox: {
    maxHeight: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "33%",
    padding: theme.spacing.unit * 4,
    transform: "translate(-50%, -50%)"
  },
  selected: {
    userSelect: "all"
  }
})

class CourseCard extends Component {
  state = { optionsEl: null, open: false }

  handleShow = event => {
    this.setState({ optionsEl: event.currentTarget })
  }

  showSnackbar = message => {
    this.setState({ snackbar: true, message: message }, () =>
      setTimeout(() => this.setState({ snackbar: false }), 5000)
    )
  }

  handleShareModal = () => {
    this.setState({ open: true })
  }

  handleCloseModal = () => {
    this.setState({ open: false })
  }

  handleClose = () => {
    this.setState({ optionsEl: null })
  }

  copyText = () => {
    var copyText = document.getElementById("shareUrl")
    copyText.select()
    document.execCommand("copy")
    this.showSnackbar("Copied To Clipboard")
  }

  render() {
    const { classes, course, route } = this.props
    const { optionsEl } = this.state

    return (
      <Card>
        <CardHeader
          action={
            <OptionsMenu
              handleShow={this.handleShow}
              handleClose={this.handleClose}
              show={optionsEl}
            />
          }
          title={<span>{course.title}</span>}
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
          <IconButton onClick={this.handleShareModal} color="primary">
            <Share />
          </IconButton>
        </CardActions>
        <Modal
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleCloseModal}
        >
          <Paper className={classes.modalBox}>
            <Grid container spacing={12} alignItems="flex-end">
              <Grid sm={10} item>
                <TextField
                  label={"Share"}
                  id={"shareUrl"}
                  className={classes.selected}
                  fullWidth
                  autoFocus
                  value={`${window.location.hostname}/app/${course.slug}`}
                />
              </Grid>
              <Grid sm={1} item>
                <IconButton color="primary" onClick={this.copyText}>
                  <FileCopy />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
        <MessageSnackbar
          open={this.state.snackbar}
          message={this.state.message}
        />
      </Card>
    )
  }
}

export default withStyles(styles)(CourseCard)
