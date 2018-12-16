// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from "@material-ui/icons/Add";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import WeightIcon from "@material-ui/icons/FitnessCenter";
import HeightIcon from "@material-ui/icons/Straighten";
import TempIcon from "@material-ui/icons/Whatshot";

const blockstack = require('blockstack');

const STORAGE_FILE = 'profile.json'

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
  constructor(props) {
    super(props)

    this.state = {
      user: blockstack.loadUserData(),
      sundlyTimeline: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target

    this.setState(prev => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  render() {
    const { classes } = this.props;

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
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="datetime-local"
                  className={classNames(classes.margin, classes.textField)}
                  label="datetime"
                  type="datetime-local"
                  defaultValue={(new Date(Date.now())).toISOString()}
                  InputLabelProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WeightIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <br/>
                <TextField
                  id="weight"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Weight"
                  value={this.state.weight}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WeightIcon />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                  }}
                />
                <br/>
                <TextField
                  id="height"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Height"
                  value={this.state.height}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeightIcon />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">Mts</InputAdornment>,
                  }}
                />
                <br/>
                <TextField
                  id="temperature"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Temperature"
                  value={this.state.temperature}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TempIcon />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">C</InputAdornment>,
                  }}
                />
                <br/>
                <TextField
                  id="heart_rate"
                  className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Heart Rate"
                  value={this.state.heart_rate}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeartIcon />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
                  }}
                />
              </form>
              <Button variant="fab" color={`primary`}>
                <AddIcon />
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
