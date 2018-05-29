import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = {
  container: { display: "flex", padding: "3rem" }
}

const Container = ({ classes, children }) => {
  return <div className={classes.container}>{children}</div>
}

export default withStyles(styles)(Container)
