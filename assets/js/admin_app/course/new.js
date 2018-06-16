import React, { Component } from "react"
import phoenixChannel from "../../socket"
import { Route, Switch, Link } from "react-router-dom"
import { getCsrfToken } from "../../token"

import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import LessonList from "../../components/lessonList"
import LessonSelect from "../../components/lessonSelect"
import { NewCourseInfo } from "../../components/NewCourseInfo"
import Modal from "@material-ui/core/Modal"
import ShowLesson from "../lesson/show"
import Paper from "@material-ui/core/Paper"
import NewLessonModal from "../../components/newLessonModal"

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

class NewCourse extends Component {
  state = {
    title: "Lesson Title",
    description: "description goes here",
    lessons: [],
    allLessons: [],
    activeStep: 0,
    open: false
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
    phoenixChannel.push("get_company_lessons").receive("ok", resp => {
      this.setState({ allLessons: resp.lessons })
    })
  }

  handleSelect = lesson => {
    let { lessons } = this.state

    if (lessons.indexOf(lesson) === -1) {
      lessons = [...lessons, lesson]
    }

    this.setState({
      lessons
    })
  }

  handleRemove = lesson_to_remove => {
    let { lessons } = this.state

    lessons = lessons.filter(lesson => lesson !== lesson_to_remove)

    this.setState({
      lessons
    })
  }

  handlePreview = lesson => {
    this.setState({ open: !this.state.open, previewLesson: lesson })
  }

  saveCourse = () => {
    const token = getCsrfToken()
    const { title, description, lessons } = this.state

    fetch(`/api/course`, {
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
    const { activeStep, allLessons } = this.state

    const Buttons = () => (
      <div className={classes.buttonGroup}>
        <Button
          onClick={() => this.saveCourse()}
          variant="outlined"
          className={classes.button}
        >
          Save Draft
        </Button>
        <Button
          onClick={() => this.handleBack()}
          to={`${match.path}/${activeStep - 1 || ""}`}
          component={Link}
          variant="outlined"
          color="secondary"
          disabled={activeStep == 0}
          className={classes.button}
        >
          Previous
        </Button>
        {activeStep == 1 ? (
          <Button
            onClick={() => this.saveCourse()}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => this.handleNext()}
            to={`${match.path}/${activeStep + 1}`}
            component={Link}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Next
          </Button>
        )}
      </div>
    )

    return (
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
                <h2 className={classes.header}> {this.state.title} </h2>
                <LessonSelect
                  handleSelect={lesson => this.handleSelect(lesson)}
                  items={allLessons}
                />
                <div className={classes.container}>
                  <Modal onClose={this.handlePreview} open={this.state.open}>
                    <Paper className={classes.modalBox}>
                      <ShowLesson lesson={this.state.previewLesson} />
                    </Paper>
                  </Modal>
                </div>
                <LessonList
                  handleRemove={lesson => this.handleRemove(lesson)}
                  lessons={this.state.lessons}
                  handlePreview={lesson => this.handlePreview(lesson)}
                />
              </React.Fragment>
            )}
          />
        </Switch>
        <Buttons />
      </form>
    )
  }
}

export default withStyles(styles)(NewCourse)
