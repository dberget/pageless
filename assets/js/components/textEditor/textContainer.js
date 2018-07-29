import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = {
  text: {
    padding: "4rem",
    width: 950
  }
}

const TextContainer = props => {
  return <div className={props.classes.text}>{props.children}</div>
}

export default withStyles(styles)(TextContainer)
