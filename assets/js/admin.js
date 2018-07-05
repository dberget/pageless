import css from "../css/app.css"
import "phoenix_html"
import "./socket"

import React from "react"
import ReactDOM from "react-dom"
import App from "./admin_app/index"
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688"
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/admin">
        <App />
      </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById("admin_app")
  )
})
