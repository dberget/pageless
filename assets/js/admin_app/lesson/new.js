import React, { Component } from "react"
import phoenixChannel from "../../socket"
import { withRouter } from "react-router-dom"

import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Save from "@material-ui/icons/Save"

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    margin: "auto"
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
  button: {
    marginLeft: "auto",
    marginTop: "2rem"
  }
})

const lessonTypes = [
  { value: "VIDEO", label: "Video" },
  { value: "ARTICLE", label: "Article" },
  { value: "ELEARNING", label: "eLearning" },
  { value: "OTHER", label: "Other" },
  { value: "CLASSROOM", label: "Classroom" }
]

class NewLesson extends Component {
  state = { title: "", description: "", content: "", type: "" }

  saveLesson = () => {
    phoenixChannel
      .push("save_lesson", { lesson: this.state })
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
    const { classes } = this.props
    return (
      <div className={classes.formContainer}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="title"
            label="Lesson Title"
            className={classes.textField}
            fullWidth
            value={this.state.title}
            onChange={this.handleChange("title")}
            margin="normal"
          />
          <TextField
            id="select-type"
            select
            label="Select Type"
            className={classes.textField}
            value={this.state.type}
            onChange={this.handleChange("type")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select the lesson type"
            margin="normal"
          >
            {lessonTypes.map(option => (
              <MenuItem key={option.index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {this.state.type ? (
            <TextField
              id="content"
              label={`${this.state.type} URL`}
              className={classes.textField}
              value={this.state.content}
              onChange={this.handleChange("content")}
              margin="normal"
            />
          ) : null}
          <TextField
            multiline
            rows="4"
            id="description"
            label="Description"
            fullWidth
            onChange={this.handleChange("description")}
            value={this.state.description}
            className={classes.textField}
            margin="normal"
          />

          <Button
            onClick={() => this.saveLesson()}
            variant="raised"
            color="primary"
            className={classes.button}
          >
            <Save className={classes.leftIcon} />
            Save Lesson
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(NewLesson)
