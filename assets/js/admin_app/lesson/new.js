import React, { Component, Fragment } from "react"

import TextField from "@material-ui/core/TextField"
import Modal from "@material-ui/core/Modal"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Save from "@material-ui/icons/Save"
import CloudUpload from "@material-ui/icons/CloudUpload"
import MessageSnackbar from "../../components/snackbar"
import { getCsrfToken } from "../../token"
import Grid from "@material-ui/core/Grid"
import LessonRadioGroup from "../../components/lessonRadioGroup"
import TextEditor from "../../components/textEditor/textEditor"
import initialValue from "../../components/textEditor/value"

const lessonTypes = [
  { value: "ELEARNING", label: "eLearning" },
  { value: "ARTICLE", label: "Article" },
  { value: "VIDEO", label: "Video" },
  { value: "TEXT", label: "Text" },
  { value: "OTHER", label: "Other" }
]

const sourceTypes = [
  { value: "FILE", label: "File" },
  { value: "URL", label: "Url" }
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
  },
  modalBox: {
    maxHeight: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "33%",
    padding: theme.spacing.unit * 4,
    transform: "translate(-50%, -50%)"
  },
  modalBoxText: {
    height: "calc(100% - 100px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "66%",
    padding: theme.spacing.unit * 4,
    transform: "translate(-50%, -50%)",
    overflow: "scroll"
  }
})

class NewLesson extends Component {
  initialState = {
    form: {
      title: "",
      description: "",
      content: initialValue,
      lesson_type: "",
      source_type: "",
      source: ""
    },
    fileAdded: false,
    open: false
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

  handleTextChange = text => {
    this.setState({
      form: {
        ...this.state.form,
        content: text
      }
    })
  }

  openModal = value => {
    this.setState({
      form: {
        ...this.state.form,
        source_type: value
      },
      open: true
    })
  }

  handleFileThumbnail = name => event => {
    var url = encodeImageFileAsURL(event)

    this.setState({
      form: {
        ...this.state.form,
        [name]: url
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
            {/* <Grid xs={3} item> */}
            {/* <LessonRadioGroup
                handleChange={this.handleChange}
                value={form.source_type}
                updateField={"source_type"}
                data={sourceTypes}
                label={"Source"}
              /> */}
            {/* </Grid> */}
            <Grid xs={6} item>
              <Grid item>
                <Button
                  onClick={() => this.openModal("URL")}
                  variant="raised"
                  color="primary"
                  className={classes.button}
                >
                  URL
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => this.openModal("TEXT")}
                  variant="raised"
                  color="primary"
                  className={classes.button}
                >
                  Text Lesson
                </Button>
              </Grid>
              <Grid item>
                <div className={classes.inputSet}>
                  <TextField
                    id="file"
                    // disabled={form.source_type !== "FILE"}
                    type="file"
                    onChange={() =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          source_type:
                            this.lesson_type == "ELEARNING" ? "URL" : "FILE"
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
              disabled={!form.source_type}
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
        <Modal
          className={classes.modal}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          {form.source_type == "URL" ? (
            <Paper className={classes.modalBox}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid sm={10} item>
                  <TextField
                    id="url"
                    label={`URL`}
                    fullWidth
                    onChange={e =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          source: e.target.value
                        }
                      })
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid sm={1} item>
                  <IconButton
                    onClick={() => this.setState({ open: false })}
                    className={classes.button}
                  >
                    <Save />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper className={classes.modalBoxText}>
              <TextEditor
                value={this.state.form.content}
                handleChange={this.handleTextChange}
              />
            </Paper>
          )}
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(NewLesson)
