import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import FolderIcon from "@material-ui/icons/Folder"
import DeleteIcon from "@material-ui/icons/Delete"
import PlayIcon from "@material-ui/icons/PlayArrow"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    marginTop: 10
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
})

const ListView = ({
  items,
  secondary,
  classes,
  handleRemove,
  handlePreview
}) => {
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
                <IconButton
                  onClick={() => handlePreview(item)}
                  aria-label="Delete"
                >
                  <PlayIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemove(item)}
                  aria-label="Delete"
                >
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
