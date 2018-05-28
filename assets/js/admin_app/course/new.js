import React, { Component } from "react"
import phoenixChannel from "../../socket"
import { withRouter } from "react-router-dom"

import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Save from "@material-ui/icons/Save"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  card: {
    minWidth: 275,
    width: "100%",
    margin: ".5rem 0px"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "50%"
  },
  menu: {
    width: 200
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    marginLeft: "auto",
    marginTop: "2rem"
  }
})

class newCourse extends Component {
  state = { form: { title: "", description: "", lessons: [] }, all_lessons: [] }

  componentDidMount = () => {
    phoenixChannel
      .push("get_company_lessons", { company_id: 1 })
      .receive("ok", resp => {
        this.setState({ all_lessons: resp.lessons })
      })
  }

  save = () => {
    phoenixChannel
      .push("save_course", { lesson: this.state })
      .receive("ok", resp => {
        this.props.history.push("/")
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.formContainer}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="title"
            label="Course Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange("title")}
            margin="normal"
          />
          <Button
            onClick={() => this.save()}
            variant="raised"
            color="primary"
            className={classes.button}
          >
            <Save className={classes.leftIcon} />
            Save Course
          </Button>
          <TextField
            multiline
            rows="4"
            id="description"
            label="Description"
            fullWidth
            onChange={this.handleChange("description")}
            value={this.state.description}
            className={classes.textField}
            margin="normal"
          />
          {this.state.all_lessons.map(lesson => (
            <Card fullWidth className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  {lesson.title}
                </Typography>
                <Typography variant="headline" component="h2">
                  {lesson.type}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {lesson.description}
                </Typography>
                <Typography component="p">{lesson.content}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Preview</Button>
              </CardActions>
            </Card>
          ))}
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(newCourse)
