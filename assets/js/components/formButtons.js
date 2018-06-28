import React from "react"
import { Button } from "@material-ui/core"
i
const FormButtons = ({ classes, match, save, handleBack, handleNext }) => (
  <div className={classes.buttonGroup}>
    <Button
      onClick={() => save()}
      variant="outlined"
      className={classes.button}
    >
      Save Draft
    </Button>
    <Button
      onClick={() => handleBack()}
      to={`${match.path}/${activeStep - 1 || ""}`}
      component={Link}
      variant="outlined"
      color="secondary"
      disabled={activeStep == 0}
      className={classes.button}
    >
      Previous
    </Button>
    {activeStep == 1 ? (
      <Button
        onClick={() => save()}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Save
      </Button>
    ) : (
      <Button
        onClick={() => handleNext()}
        to={`${match.path}/${activeStep + 1}`}
        component={Link}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Next
      </Button>
    )}
  </div>
)

export default FormButtons
