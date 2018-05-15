import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

class App extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Button color="inherit">Login</Button>
        </AppBar>
      </div>
    )
  }
}

export default App
