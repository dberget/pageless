import React, { Component } from "react"
import Downshift from "downshift"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { MenuItem } from "@material-ui/core"

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "auto"
  },
  input: {
    minWidth: 400
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
  }
})

class LessonSelect extends Component {
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
                id="add-lesson"
                label="Add Lesson"
                {...getInputProps()}
                className={classes.input}
              />
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
