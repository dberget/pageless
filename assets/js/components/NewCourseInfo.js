import React from "react"
import TextField from "@material-ui/core/TextField"

export const NewCourseInfo = ({
  title,
  description,
  handleChange,
  classes
}) => (
  <div>
    <h4>New Course Information</h4>
    <TextField
      id="title"
      label="Title"
      className={classes.textField}
      value={title}
      onChange={handleChange("title")}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
    <TextField
      multiline
      rows="4"
      id="description"
      label="Description"
      fullWidth
      onChange={handleChange("description")}
      value={description}
      className={classes.textField}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
  </div>
)
