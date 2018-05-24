import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
})

class Course extends React.Component {
  constructor() {
    super()

    this.state = {
      activeStep: 0,
      is_loading: true
    }
  }

  componentWillMount() {
    this.getLessons(this.props.match.params.id)
  }

  getLessons = id => {
    channelGlobal.push("get_lessons", { path_id: id }).receive("ok", resp => {
      this.setState({ lessons: resp.lessons, is_loading: false })
    })
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  render() {
    const { classes, match } = this.props
    const { activeStep, lessons, is_loading } = this.state

    return (
      <React.Fragment>
        {is_loading ? null : (
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {lessons.map((lesson, index) => {
                return (
                  <Step key={lesson.title}>
                    <StepLabel>{lesson.title}</StepLabel>
                    <StepContent>
                      <Typography>{lesson.description}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>

                          <Button
                            variant="raised"
                            color="primary"
                            component={Link}
                            to={`/app/lesson/${lesson.id}`}
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === lessons.length ? "Finish" : "View"}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
            </Stepper>
            {activeStep === lessons.length &&
              lessons.length > 0 && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>All steps completed - you're finished</Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </Paper>
              )}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Course)
