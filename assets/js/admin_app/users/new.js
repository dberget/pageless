import React, { Component, Fragment } from "react"
import phoenixChannel from "../../socket"
import { Route, Switch, Link } from "react-router-dom"
import { getCsrfToken } from "../../token"

import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "800px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 300
  },
  header: {
    marginTop: "-25px"
  },
  modalBox: {
    maxHeight: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    padding: theme.spacing.unit * 5,
    overflow: "scroll",
    transform: "translate(-50%, -50%)"
  },
  buttonGroup: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  button: {
    margin: "0 4px"
  }
})

class NewUsers extends Component {
  state = {
    first: "First",
    last: "Last",
    email: "user@your-domain.com",
    courses: [],
    open: false
  }

  componentDidMount = () => {
    // phoenixChannel.push("get_company_courses").receive("ok", resp => {
    //   this.setState({ courses: resp.courses })
    // })
  }

  saveUser = () => {
    const token = getCsrfToken()
    const { first, last, email, courses } = this.state

    fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify({ title, description, lessons }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": token
      }
    }).then(this.props.history.push("/"))
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes, match } = this.props
    const { first, email, last, courses } = this.state

    const Buttons = () => (
      <div className={classes.buttonGroup}>
        <Button
          onClick={() => this.saveUser()}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add User
        </Button>
      </div>
    )

    return (
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <h4>New User Information</h4>
          <TextField
            id="first"
            label="First"
            className={classes.textField}
            value={first}
            onChange={this.handleChange("first")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="last"
            label="Last"
            onChange={this.handleChange("last")}
            value={last}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="email"
            label="Email"
            onChange={this.handleChange("email")}
            value={email}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <Buttons />
      </form>
    )
  }
}

export default withStyles(styles)(NewUsers)
