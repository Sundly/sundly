// Dependencies
import React from "react";
import PropTypes from "prop-types";

// Styles
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  avatar: {
    margin: 20
  },
  bigAvatar: {
    width: 120,
    height: 120
  },
  editButton: {
    float: "right"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  }
});

class Contacts extends React.Component {
  state = {
    contacts: [
      { id: 1, name: "Dr. Johnny Crypto", specialty: "General practice" },
      { id: 2, name: "Elvis Prescription", specialty: "Dermatology" },
      { id: 3, name: "M.D. Paul McBitcoin", specialty: "Pediatrics" },
      { id: 4, name: "Kurt Codebrain", specialty: "Oncology" },
      { id: 5, name: "Dr. Jimi Haskell", specialty: "General practice" },
      { id: 7, name: "M.D. David Bowser", specialty: "Ophthalmology" },
      { id: 8, name: "Bob Dyslexia", specialty: "Rehabilitation" },
      { id: 9, name: "M.D. Eric Kripton", specialty: "Radiology" }
    ]
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
              Timeline
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <List>
              {this.state.contacts.map(contact => (
                <ListItem
                  key={contact.id}
                  dense
                  button
                  className={classes.listItem}
                >
                  <Avatar
                    src={`https://api.adorable.io/avatars/285/${contact.name}.png`}
                  />
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.specialty}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                      <ShareIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Button variant="fab" className={classes.fab} color={`primary`}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contacts);
