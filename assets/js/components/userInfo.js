import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const NewUserInfo = ({ handleChange, classes, data }) => {
  return (
    <div>
      <h4>New User Information</h4>
      <TextField
        id="first"
        label="First"
        className={classes.textField}
        value={data.first}
        onChange={handleChange("first")}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="last"
        label="Last"
        onChange={handleChange("last")}
        value={data.last}
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="email"
        label="Email"
        fullWidth
        onChange={handleChange("email")}
        value={data.email}
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="department"
        label="Department"
        onChange={handleChange("department")}
        value={data.department}
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <FormControl>
        <Select
          className={classes.textField}
          value={data.role}
          onChange={handleChange("role")}
        >
          <MenuItem value={"ADMIN"}>Admin</MenuItem>
          <MenuItem value={"LEARNER"}>Learner</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default NewUserInfo
