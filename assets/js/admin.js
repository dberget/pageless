import css from "../css/app.css"
import "phoenix_html"
import "./socket"

import React from "react"
import ReactDOM from "react-dom"
import App from "./admin_app/index"
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter } from "react-router-dom"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter basename="/admin">
        <App />
      </BrowserRouter>
    </React.Fragment>,
    document.getElementById("admin_app")
  )
})
