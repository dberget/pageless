import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

const styles = theme => ({
  formControl: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class LessonRadioGroup extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">{this.props.label}</FormLabel>
          <RadioGroup
            aria-label="lessontype"
            name="lessontype"
            className={classes.group}
            value={this.props.value}
            onChange={this.props.handleChange(this.props.updateField)}
          >
            {this.props.data.map(type => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                control={<Radio />}
                label={type.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles)(LessonRadioGroup)
