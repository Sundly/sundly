// Dependencies
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

// Styles
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocalHospital from "@material-ui/icons/LocalHospital";
import Share from "@material-ui/icons/Share";
import AddIcon from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

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


class TimeLine extends React.Component {
  state = {
    name: "Ben",
    last_name: "Orozco",
  };


  render() {
    const { classes } = this.props;
    console.log(classes)

    return (
      <div className={classes.root} style={{marginTop: 60}}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Timeline
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              07/13/2018
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  disabled
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="last-name"
                  label="Last Name"
                  className={classes.textField}
                  value={this.state.last_name}
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Write Symptoms"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Symptoms"
                  fullWidth
                  margin="normal"
                />
              </form>
              <Button variant="fab" color={`primary`}>
                <Link to="/">
                  <AddIcon />
                </Link>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TimeLine.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimeLine);
