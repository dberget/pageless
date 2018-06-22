import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import FolderIcon from "@material-ui/icons/Folder"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    marginTop: 10
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
})

const ListView = ({ items, secondary, classes, handleRemove }) => {
  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List>
          {items.map(item => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={secondary ? item.description : null}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleRemove()} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default withStyles(styles)(ListView)
