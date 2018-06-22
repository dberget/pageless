import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const SearchBar = ({ filterTypes, handleChange }) => {
  return (
    <Fragment>
      <Grid item xs={12} lg={6}>
        <TextField fullWidth label="Search" />
      </Grid>
      {filterTypes ? (
        <Grid item xs={12} lg={6}>
          {filterTypes.map(val => (
            <FormControlLabel
              label={val.label}
              key={val.label}
              control={
                <Checkbox
                  onChange={handleChange(val.value)}
                  value={val.value}
                  color="primary"
                />
              }
            />
          ))}
        </Grid>
      ) : null}
    </Fragment>
  )
}

export default SearchBar
