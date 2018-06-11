import React, { Component } from "react"

import { NavLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import ButtonBase from "@material-ui/core/ButtonBase"

const styles = {
  root: {
    display: "flex",
    flexGrow: 1
  },
  button: {
    height: 48
  },
  menuLink: {
    color: "#0000008a",
    fontSize: ".875rem",
    lineHeight: "1.4rem",
    fontWeight: 500,
    textTransform: "uppercase",
    padding: "12px 16px",
    margin: "0px 1px",
    borderBottom: "solid",
    borderBottomColor: "transparent"
  },
  selected: {
    borderBottomColor: "#2196f3",
    borderBottom: "solid",
    color: "#2196f3"
  }
}

class SubMenu extends Component {
  render() {
    const { classes, resource } = this.props
    return (
      <Paper className={classes.root}>
        <ButtonBase className={classes.button} component="button">
          <NavLink
            exact
            activeClassName={classes.selected}
            className={classes.menuLink}
            to={`/${resource}`}
          >
            {resource} Home
          </NavLink>
        </ButtonBase>
        <ButtonBase className={classes.button} component="button">
          <NavLink
            activeClassName={classes.selected}
            className={classes.menuLink}
            to={`/${resource}/new`}
          >
            New {resource}
          </NavLink>
        </ButtonBase>
        {this.props.children}
      </Paper>
    )
  }
}

export default withStyles(styles)(SubMenu)
