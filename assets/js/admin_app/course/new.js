import React, { Component } from "react"
import phoenixChannel from "../../socket"
import { Route, withRouter, Switch, NavLink, Link } from "react-router-dom"
import Container from "../navigation/container"

import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Save from "@material-ui/icons/Save"
import Typography from "@material-ui/core/Typography"
import LessonList from "../../components/lessonList"
import LessonSelect from "../../components/lessonSelect"
import { NewCourseInfo } from "../../components/NewCourseInfo"

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    Width: "500px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 200
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: { margin: "0 2px" }
})

class NewCourse extends Component {
  state = {
    title: "title",
    description: "desc",
    selectedLessons: [],
    allLessons: [],
    activeStep: 0
  }

  handleNext = () => {
    const { activeStep } = this.state

    this.setState(prevState => ({
      ...prevState,
      activeStep: activeStep + 1
    }))
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState(prevState => ({
      ...prevState,
      activeStep: activeStep - 1
    }))
  }

  componentDidMount = () => {
    phoenixChannel
      .push("get_company_lessons", { company_id: 1 })
      .receive("ok", resp => {
        this.setState({ allLessons: resp.lessons })
      })
  }

  handleSelect = lesson => {
    let { selectedLessons } = this.state

    if (selectedLessons.indexOf(lesson) === -1) {
      selectedLessons = [...selectedLessons, lesson]
    }

    this.setState({
      selectedLessons
    })
  }

  save = () => {
    phoenixChannel
      .push("save_course", { course: this.state.form })
      .receive("ok", resp => {
        this.props.history.push("/")
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes, match } = this.props
    const { activeStep, allLessons } = this.state

    const Buttons = () => (
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => this.handleBack()}
          variant="raised"
          color="primary"
          className={classes.button}
          component={Link}
          disabled={activeStep == 0}
          to={`${match.path}/${activeStep - 1 || ""}`}
        >
          Prev
        </Button>
        <Button
          onClick={() => this.handleNext()}
          variant="raised"
          color="primary"
          className={classes.button}
          component={Link}
          to={`${match.path}/${activeStep + 1}`}
        >
          Continue
        </Button>
      </div>
    )

    return (
      <div className={classes.formContainer}>
        <Buttons />
        <form className={classes.form} noValidate autoComplete="off">
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={() => (
                <NewCourseInfo
                  title={this.state.title}
                  description={this.state.description}
                  handleChange={this.handleChange}
                  classes={classes}
                />
              )}
            />
            <Route
              path={`${match.path}/1`}
              render={() => (
                <React.Fragment>
                  <LessonSelect
                    handleSelect={lesson => this.handleSelect(lesson)}
                    items={allLessons}
                  />
                  <div className={classes.container}>
                    <LessonList lessons={this.state.selectedLessons} />
                  </div>
                </React.Fragment>
              )}
            />
          </Switch>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(NewCourse)
