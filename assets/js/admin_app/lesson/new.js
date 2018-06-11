import React, { Component } from "react"

import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"
import Save from "@material-ui/icons/Save"
import CloudUpload from "@material-ui/icons/CloudUpload"
import MessageSnackbar from "../../components/snackbar"
import { getCsrfToken } from "../../token"
import Grid from "@material-ui/core/Grid"
import capture from "../../utils/screenshot"

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
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
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
    fileAdded: false,
    snackbar: false
  }

  uploadFile = () => {
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
    })
      .then(this.showSnackbar("File Uploaded Successfully"))
      .catch(onrejected => this.showSnackbar(onrejected.message))
  }

  saveLesson = () => {
    const token = getCsrfToken()
    const { form, fileUploaded } = this.state

    var fileField = document.querySelector("input[type='file']")
    console.log(fileField)

    fetch(`/save`, {
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

  handleChange = (name, callback = false) => event => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value
      }
    })

    if (typeof callback === "function") {
      callback()
    }
  }

  getScreenshot() {
    console.log("screenshot")
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
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <TextField
                id="content"
                label={`URL`}
                disabled={!form.type}
                className={classes.textField}
                value={form.content}
                onChange={this.handleChange("content", () =>
                  this.getScreenshot()
                )}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Typography variant="button" gutterBottom>
                Or
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="file"
                disabled={!form.type}
                type="file"
                onChange={() => this.setState({ fileAdded: true })}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button
                disabled={!this.state.fileAdded}
                onClick={() => this.uploadFile()}
                color="primary"
              >
                <CloudUpload className={classes.leftIcon} />
                Upload
              </Button>
            </Grid>
          </Grid>

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
