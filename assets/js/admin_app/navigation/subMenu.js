import React, { Component } from "react"

import { NavLink } from "react-router-dom"
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

class SubMenu extends Component {
  render() {
    const { classes, resource } = this.props
    return (
      <Paper className={classes.root}>
        <NavLink
          exact
          activeClassName={classes.selected}
          className={classes.menuLink}
          to={`/${resource}`}
        >
          {resource} Home
        </NavLink>
        <NavLink
          activeClassName={classes.selected}
          className={classes.menuLink}
          to={`/${resource}/new`}
        >
          New {resource}
        </NavLink>
        {this.props.children}
      </Paper>
    )
  }
}

export default withStyles(styles)(SubMenu)
