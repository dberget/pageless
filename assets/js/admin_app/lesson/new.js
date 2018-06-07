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
    title: "",
    description: "",
    content: "",
    type: "",
    file: {},
    snackbar: false
  }

  saveLesson = () => {
    var formData = new FormData()
    var fileField = document.querySelector("input[type='file']")
    const token = getCsrfToken()

    formData.append("name", "testname")
    formData.append("avatar", fileField.files[0])

    fetch(`http://localhost:4000/upload`, {
      method: "PUT",
      body: formData,
      credentials: "same-origin",
      headers: {
        "x-csrf-token": token
      }
    })
  }

  // saveLesson = () => {
  //   var fr = new FileReader()

  //   fr.addEventListener("loadend", function() {
  //     let base64String = btoa(String.fromCharCode(...new Uint8Array(fr.result)))

  //     phoenixChannel
  //       .push("save_file", { data: base64String })
  //       .receive("ok", resp => console.log("ok"))
  //   })

  // fr.readAsArrayBuffer(this.state.file)

  // phoenixChannel
  //   .push("save_lesson", { lesson: this.state })
  //   .receive("ok", resp => {
  //     this.props.onSave ? this.props.onSave() : null
  //     this.setState({
  //       title: "",
  //       description: "",
  //       content: "",
  //       type: "",
  //       file: ""
  //     })
  //     this.showSnackbar()
  //   })
  // }

  showSnackbar = () => {
    this.setState({ snackbar: true })
    setTimeout(() => this.setState({ snackbar: false }), 5000)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleFileChange = name => event => {
    this.setState({ file: event.target.files[0] })
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
            <React.Fragment>
              <TextField
                id="content"
                label={`${this.state.type} URL`}
                className={classes.textField}
                value={this.state.content}
                onChange={this.handleChange("content")}
                margin="normal"
              />
              <TextField
                id="file"
                type="file"
                label={`Upload File`}
                className={classes.textField}
                onChange={this.handleFileChange("file")}
                margin="normal"
              />
            </React.Fragment>
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
        <MessageSnackbar
          open={this.state.snackbar}
          message={"Lesson Saved Successfully"}
        />
      </div>
    )
  }
}

export default withStyles(styles)(NewLesson)
