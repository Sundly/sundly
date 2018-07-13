import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
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

class Profile extends React.Component {
  state = {
    name: "Ben",
    last_name: "Orozco",
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Avatar
                alt="Ben Orozco"
                src="https://d1qb2nb5cznatu.cloudfront.net/users/2370959-original"
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              <code>benoror.id</code>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  required
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  required
                  id="last-name"
                  label="Last Name"
                  className={classes.textField}
                  value={this.state.last_name}
                  margin="normal"
                />
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
