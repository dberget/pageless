import React, { Component, Fragment } from "react"
import { getCsrfToken } from "../../token"
import phoenixChannel from "../../socket"
import { Route, Switch, Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import LessonSelect from "../../components/lessonSelect"
import NewUserInfo from "../../components/userInfo"

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "600px"
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
    user: {
      first: "First",
      last: "Last",
      email: "user@email.com",
      courses: [],
      department: "",
      role: "LEARNER"
    },
    allCourses: [],
    open: false
  }

  componentDidMount = () => {
    phoenixChannel.push("get_company_courses").receive("ok", resp => {
      this.setState({ allCourses: resp.courses, is_loading: false })
    })
  }

  saveUser = () => {
    const token = getCsrfToken()
    const { user } = this.state

    fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify({ user }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": token
      }
    }).then(this.props.history.push("/"))
  }

  handleChange = name => event => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: event.target.value
      }
    })
  }

  handleSelect = course => {
    let { courses } = this.state

    if (courses.indexOf(course) === -1) {
      courses = [...courses, course]
    }

    this.setState({
      courses
    })
  }

  render() {
    const { classes, match } = this.props
    const { user, allCourses } = this.state

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
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={() => (
              <NewUserInfo
                handleChange={this.handleChange}
                data={user}
                classes={classes}
              />
            )}
          />
          <LessonSelect
            handleSelect={course => this.handleSelect(course)}
            items={allCourses}
            classes={classes}
          />
        </Switch>
        <Buttons />
      </form>
    )
  }
}

export default withStyles(styles)(NewUsers)
