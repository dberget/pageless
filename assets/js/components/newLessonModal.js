import React, { Component } from "react"
import Add from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import NewLesson from "../admin_app/lesson/new"
import Tooltip from "@material-ui/core/Tooltip"
import Paper from "@material-ui/core/Paper"

const classes = theme => ({
  modalBox: {
    maxHeight: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    padding: theme.spacing.unit * 2,
    transform: "translate(-50%, -50%)"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

class NewLessonModal extends Component {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    return (
      <React.Fragment>
        <Tooltip placement="top" title="Create New Lesson" position="absolute">
          <Button
            onClick={() => this.handleOpen()}
            variant="fab"
            className={classes.fab}
            color="primary"
          >
            <Add />
          </Button>
        </Tooltip>
        <Modal
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Paper className={classes.modalBox}>
            <NewLesson onSave={() => this.handleClose()} />
          </Paper>
        </Modal>
      </React.Fragment>
    )
  }
}

export default NewLessonModal
