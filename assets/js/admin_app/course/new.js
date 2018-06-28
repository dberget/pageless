import React, { Component, Fragment } from "react"
import phoenixChannel from "../../socket"
import { Route, Switch, Link } from "react-router-dom"
import { getCsrfToken } from "../../token"

import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import LessonSelect from "../../components/lessonSelect"
import { NewCourseInfo } from "../../components/NewCourseInfo"
import Modal from "@material-ui/core/Modal"
import ShowLesson from "../lesson/show"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import ListView from "../../components/listView"

const slugify = name => {
  return name
    .toLowerCase()
    .slice(0, 20)
    .replace(/[^a-z0-9]+/g, "-")
}

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
  // modalBox: {
  //   maxHeight: "calc(100% - 100px)",
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   padding: theme.spacing.unit * 5,
  //   overflow: "scroll",
  //   transform: "translate(-50%, -50%)"
  // },
  buttonGroup: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  button: {
    margin: "0 4px"
  },
  adornment: {
    marginRight: 0
  }
})

class NewCourse extends Component {
  state = {
    title: "",
    url: "",
    description: "",
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

    const slug = slugify(title)

    fetch(`/api/course`, {
      method: "PUT",
      body: JSON.stringify({ title, description, lessons, slug: slug }),
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
    const { activeStep, allLessons, lessons } = this.state

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
                url={this.state.title}
                description={this.state.description}
                handleChange={this.handleChange}
                classes={classes}
              />
            )}
          />
          <Route
            path={`${match.path}/1`}
            render={() => (
              <Fragment>
                <h2 className={classes.header}> {this.state.title} </h2>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <LessonSelect
                      handleSelect={lesson => this.handleSelect(lesson)}
                      items={allLessons}
                    />
                  </Grid>
                  <div className={classes.container}>
                    <Modal onClose={this.handlePreview} open={this.state.open}>
                      <Paper className={classes.modalBox}>
                        <ShowLesson lesson={this.state.previewLesson} />
                      </Paper>
                    </Modal>
                  </div>
                  <Grid item xs={12}>
                    <ListView
                      handleRemove={lesson => this.handleRemove(lesson)}
                      handlePreview={lesson => this.handlePreview(lesson)}
                      items={lessons}
                      secondary
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
          />
        </Switch>
        <Buttons />
      </form>
    )
  }
}

export default withStyles(styles)(NewCourse)
