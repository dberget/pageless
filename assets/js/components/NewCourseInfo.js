import React from "react"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import InputAdornment from "@material-ui/core/InputAdornment"

const slugify = name => {
  return name
    .toLowerCase()
    .slice(0, 20)
    .replace(/[^a-z0-9]+/g, "-")
}

const filterTypes = [{ value: "REQUIRED", label: "Required" }]

export const NewCourseInfo = ({
  title,
  url,
  description,
  handleChange,
  classes
}) => (
  <div>
    <h4>New Course Information</h4>
    <TextField
      id="title"
      label="Title"
      placeholder="onboarding 101"
      className={classes.textField}
      value={title}
      onChange={handleChange("title")}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
    <TextField
      id="url"
      label="Url"
      className={classes.textField}
      value={slugify(url)}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            classes={{ positionStart: classes.adornment }}
            position="start"
          >
            www.company.pageless.com/app/
          </InputAdornment>
        )
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
    {filterTypes.map(val => (
      <FormControlLabel
        label={val.label}
        key={val.label}
        control={
          <Checkbox
            onChange={handleChange("topic")}
            value={val.value}
            color="primary"
          />
        }
      />
    ))}
  </div>
)
