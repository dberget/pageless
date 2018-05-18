import React, { Component } from "react"
import { withStyles } from "@material-ui/core"

const styles = theme => ({})

class Lesson extends Component {
  render() {
    const { classes } = this.props
    return (
      <iframe
        frameBorder="false"
        src="http://staging.dashe.com/demo/What%20is%20a%20Leader%20Module%202%20Demo%20Version%20-%20Storyline%20output/story_html5.html"
      />
    )
  }
}

export default withStyles(styles)(Lesson)
