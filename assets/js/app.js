import css from "../css/app.css"
import "phoenix_html"

import React from "react"
import ReactDOM from "react-dom"
import App from "./components/index"
import CssBaseline from "@material-ui/core/CssBaseline"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>,
    document.getElementById("app")
  )
})
