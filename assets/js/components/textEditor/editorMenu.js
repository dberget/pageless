import React, { Component } from "react"

import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  menuLink: {
    color: theme.palette.primary.dark,
    fontSize: ".875rem",
    fontFamily: theme.typography.fontFamily,
    lineHeight: "1.4rem",
    textTransform: "uppercase",
    padding: "12px 16px",
    borderBottom: "solid",
    borderBottomColor: "transparent",
    height: 45
  },
  selected: {
    borderBottomColor: theme.palette.secondary.main,
    borderBottom: "solid",
    color: theme.palette.primary.dark
  }
})

class EditorMenu extends Component {
  render() {
    const { classes, children } = this.props
    return (
      <div className={classes.root}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            className: classes.menuLink
          })
        })}
      </div>
    )
  }
}

export default withStyles(styles)(EditorMenu)
