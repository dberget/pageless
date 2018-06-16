import React, { Component } from "react"

import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"
import Save from "@material-ui/icons/Save"
import CloudUpload from "@material-ui/icons/CloudUpload"
import MessageSnackbar from "../../components/snackbar"
import { getCsrfToken } from "../../token"
import Grid from "@material-ui/core/Grid"
import LessonRadioGroup from "../../components/lessonRadioGroup"

const lessonTypes = [
  { value: "VIDEO", label: "Video" },
  { value: "ARTICLE", label: "Article" },
  { value: "ELEARNING", label: "eLearning" },
  { value: "OTHER", label: "Other" },
  { value: "CLASSROOM", label: "Classroom" }
]

const sourceTypes = [
  { value: "FILE", label: "File" },
  { value: "URL", label: "Url" },
  { value: "RICHTEXT", label: "Text" }
]

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "70%",
    margin: "auto"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
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

class NewLesson extends Component {
  initialState = {
    form: {
      title: "",
      description: "",
      content: "",
      lesson_type: "VIDEO",
      source_type: "FILE",
      source: ""
    },
    fileAdded: false
  }

  state = this.initialState

  uploadFile = () => {
    let data = new FormData()
    var fileField = document.querySelector("input[type='file']")
    const token = getCsrfToken()

    data.append("file", fileField.files[0])

    fetch(`/api/upload`, {
      method: "PUT",
      body: data,
      credentials: "same-origin",
      headers: {
        "x-csrf-token": token
      }
    })
      .then(resp => resp.json())
      .then(json =>
        this.setState({
          fileAdded: true,
          form: { ...this.state.form, source: json.path }
        })
      )
      .then(this.showSnackbar("File Uploaded Successfully"))
      .catch(onrejected => this.showSnackbar(onrejected.message))
  }

  saveLesson = () => {
    const token = getCsrfToken()
    const { form } = this.state

    fetch(`/api/lesson`, {
      method: "PUT",
      body: JSON.stringify(form),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": token
      }
    })
      .then(this.showSnackbar("Lesson Saved Successfully"))
      .then(() => this.setState(this.initialState))
  }

  saveLessonDraft = () => {
    const token = getCsrfToken()
    const { form } = this.state

    fetch(`/api/lesson`, {
      method: "PUT",
      body: JSON.stringify(form),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": token
      }
    }).then(this.showSnackbar("Lesson Draft Saved"))
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
            label="Title"
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
          <Grid container direction="row" spacing={16}>
            <Grid xs={3} item>
              <LessonRadioGroup
                handleChange={this.handleChange}
                value={form.lesson_type}
                data={lessonTypes}
                updateField={"lesson_type"}
                label={"Type"}
              />
            </Grid>
            <Grid xs={3} item>
              <LessonRadioGroup
                handleChange={this.handleChange}
                value={form.source_type}
                updateField={"source_type"}
                data={sourceTypes}
                label={"Source"}
              />
            </Grid>
            <Grid xs={6} item>
              <Grid item>
                <TextField
                  id="url"
                  label={`URL`}
                  disabled={form.source_type !== "URL"}
                  className={classes.textField}
                  value={form.source}
                  onChange={this.handleChange("source")}
                  margin="normal"
                />
              </Grid>
              <div className={classes.inputSet}>
                <TextField
                  id="file"
                  disabled={form.source_type !== "FILE"}
                  type="file"
                  onChange={() =>
                    this.setState({
                      form: {
                        ...this.state.form,
                        source_type: "FILE"
                      }
                    })
                  }
                  margin="normal"
                />
                <Button
                  disabled={form.source_type !== "FILE"}
                  onClick={() => this.uploadFile()}
                  color="primary"
                >
                  <CloudUpload className={classes.leftIcon} />
                  Upload
                </Button>
              </div>
            </Grid>
          </Grid>
          <div className={classes.buttonGroup}>
            <Button
              onClick={() => this.saveLessonDraft()}
              variant="outlined"
              className={classes.button}
            >
              Save Draft
            </Button>
            <Button
              onClick={() => this.saveLesson()}
              variant="raised"
              color="primary"
              disabled={!form.source}
              className={classes.button}
            >
              <Save className={classes.leftIcon} />
              Save & New
            </Button>
          </div>
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
