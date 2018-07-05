import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const SearchBar = ({ filterTypes, handleChange, checked }) => {
  return (
    <Fragment>
      <Grid item xs={12} lg={6}>
        <TextField
          onKeyUp={handleChange("search")}
          fullWidth
          label="Search"
          id="search"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        {filterTypes
          ? filterTypes.map(val => (
              <FormControlLabel
                label={val.label}
                key={val.label}
                control={
                  <Checkbox
                    checked={val.value == checked}
                    onChange={handleChange("topic")}
                    value={val.value}
                    color="primary"
                  />
                }
              />
            ))
          : null}
      </Grid>
    </Fragment>
  )
}

export default SearchBar
