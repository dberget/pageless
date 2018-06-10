import React, { Component } from "react"
import phoenixChannel from "../../socket"

import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Save from "@material-ui/icons/Save"
import MessageSnackbar from "../../components/snackbar"
import { getCsrfToken } from "../../token"

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "70%",
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
  state = {
    form: {
      title: "",
      description: "",
      content: "",
      type: ""
    },
    snackbar: false
  }

  saveFile = () => {
    let data = new FormData()
    var fileField = document.querySelector("input[type='file']")
    const token = getCsrfToken()

    data.append("file", fileField.files[0])

    fetch(`/upload`, {
      method: "PUT",
      body: data,
      credentials: "same-origin",
      headers: {
        "x-csrf-token": token
      }
    }).then(this.showSnackbar("File Uploaded Successfully"))
  }

  saveLesson = () => {
    const token = getCsrfToken()
    const { form } = this.state

    fetch(`/upload`, {
      method: "PUT",
      body: JSON.stringify(form),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": token
      }
    }).then(this.showSnackbar("Lesson Saved Successfully"))
  }

  showSnackbar = message => {
    this.setState({ snackbar: true, message: message })

    setTimeout(() => this.setState({ snackbar: false }), 5000)
  }

  handleChange = name => event => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value
      }
    })
  }

  render() {
    const { classes } = this.props
    const { form } = this.state

    return (
      <div className={classes.formContainer}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="title"
            label="Lesson Title"
            className={classes.textField}
            fullWidth
            value={form.title}
            onChange={this.handleChange("title")}
            margin="normal"
          />
          <TextField
            id="select-type"
            select
            label="Select Type"
            className={classes.textField}
            value={form.type}
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
          {form.type ? (
            <React.Fragment>
              <TextField
                id="content"
                label={`${form.type} URL`}
                className={classes.textField}
                value={form.content}
                onChange={this.handleChange("content")}
                margin="normal"
              />
              <TextField
                id="file"
                type="file"
                label={`Upload File`}
                className={classes.textField}
                margin="normal"
              />
              <Button
                onClick={() => this.saveFile()}
                variant="raised"
                color="primary"
                className={classes.button}
              >
                <Save className={classes.leftIcon} />
                Upload File
              </Button>
            </React.Fragment>
          ) : null}
          <TextField
            multiline
            rows="4"
            id="description"
            label="Description"
            fullWidth
            onChange={this.handleChange("description")}
            value={form.description}
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
        <MessageSnackbar
          open={this.state.snackbar}
          message={this.state.message}
        />
      </div>
    )
  }
}

export default withStyles(styles)(NewLesson)
