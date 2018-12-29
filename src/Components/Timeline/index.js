// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Formik, Field, FieldArray, Form } from 'formik';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from "@material-ui/icons/Add";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import WeightIcon from "@material-ui/icons/FitnessCenter";
import HeightIcon from "@material-ui/icons/Straighten";
import TempIcon from "@material-ui/icons/Whatshot";

const blockstack = require('blockstack');

const STORAGE_FILE = 'timeline.json'

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

    this.addEvent = this.addEvent.bind(this)
  }

  fetchTimeline() {
    blockstack.getFile(STORAGE_FILE).then((timeline) => {
      const sundlyTimeline = JSON.parse(timeline)
      console.log(sundlyTimeline)
      if(!!sundlyTimeline) {
        this.setState({ sundlyTimeline })
      }
    })
  }

  saveTimeline() {
    const { sundlyTimeline } = this.state

    return blockstack.putFile(STORAGE_FILE, JSON.stringify(sundlyTimeline))
  }

  addEvent(values, actions) {
    this.setState(prev => ({
      ...prev,
      sundlyTimeline: [...prev.sundlyTimeline, values]
    }), () => this.saveTimeline().then(() =>
      actions.setSubmitting(false)
    ))
  }

  componentDidMount() {
    this.fetchTimeline()
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
              <Formik
                initialValues={{
                  datetime: (new Date(Date.now())).toISOString()
                }}
                onSubmit={this.addEvent}
              >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field name="datetime" >
                        {({ field /* _form */ }) => (
                          <TextField
                            {...field}
                            className={classNames(classes.margin, classes.textField)}
                            label="datetime"
                            type="datetime-local"
                            InputLabelProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WeightIcon />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                      </Field>
                      <br />
                      <Field name="weight" >
                        {({ field /* _form */ }) => (
                          <TextField
                            {...field}
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            label="Weight"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WeightIcon />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                          />
                        )}
                      </Field>
                      <br />
                      <Field name="height" >
                        {({ field /* _form */ }) => (
                          <TextField
                            {...field}
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            label="Height"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HeightIcon />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">Mts</InputAdornment>,
                            }}
                          />
                        )}
                      </Field>
                      <br />
                      <Field name="temperature" >
                        {({ field /* _form */ }) => (
                          <TextField
                            {...field}
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            label="Temperature"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TempIcon />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">C</InputAdornment>,
                            }}
                          />
                        )}
                      </Field>
                      <br />
                      <Field name="heart_rate" >
                        {({ field /* _form */ }) => (
                          <TextField
                            {...field}
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            label="Heart Rate"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HeartIcon />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
                            }}
                          />
                        )}
                      </Field>
                      <br />
                      <Button type="submit" disabled={isSubmitting} variant="fab" color={`primary`}>
                        <AddIcon />
                      </Button>
                    </Form>
                  )}
              </Formik>
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
