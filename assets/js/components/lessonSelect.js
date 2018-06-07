import React, { Component } from "react"
import Downshift from "downshift"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { MenuItem, Tooltip } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import NewLesson from "../admin_app/lesson/new"

const styles = theme => ({
  root: {
    margin: "auto"
  },
  input: {
    width: 550
  },
  paper: {
    zIndex: 100,
    marginTop: theme.spacing.unit,
    position: "absolute",
    overflow: "scroll",
    left: 0,
    right: 0
  },
  container: {
    position: "relative",
    flexGrow: 1
  },
  modalBox: {
    maxHeight: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    padding: theme.spacing.unit * 2,
    transform: "translate(-50%, -50%)"
  },
  fab: {
    margin: theme.spacing.unit * 2
  }
})

class LessonSelect extends Component {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { items, handleSelect, classes } = this.props
    return (
      <div className={classes.root}>
        <Downshift
          onChange={selection => handleSelect(selection)}
          itemToString={item => (item ? item.title : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div className={classes.container}>
              <TextField
                autoFocus
                id="add-lesson"
                label="Add Lesson"
                {...getInputProps()}
                className={classes.input}
              />
              <Tooltip
                placement="top"
                title="Create New Lesson"
                position="absolute"
              >
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
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {items
                    .filter(
                      item => !inputValue || item.title.includes(inputValue)
                    )
                    .map((item, index) => (
                      <MenuItem
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item.title}, {item.type}
                      </MenuItem>
                    ))}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

export default withStyles(styles)(LessonSelect)
