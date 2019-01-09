import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

import ParseCDA from '../../lib/parse_cda'

const blockstack = require('blockstack');

const PROFILE_FILE = 'profile.json'
const TIMELINE_FILE = 'timeline.json'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
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
});

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.handleFileChosen = this.handleFileChosen.bind(this)
    this.parseCDA = this.parseCDA.bind(this)
  }

  handleFileChosen({ target }) {
    const file = target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      const content = fileReader.result
      this.parseCDA(content)
    }
    fileReader.readAsText(file)
  }

  importProfile(profile) {
    if(!!profile && !!profile.firstName) {
      return blockstack.putFile(PROFILE_FILE, JSON.stringify(profile))
    }
  }

  importTimeline(timeline) {
    if(!!timeline && !!timeline.length) {
      return blockstack.getFile(TIMELINE_FILE).then((json) => {
        const currentTimeline = JSON.parse(json)
        if(!!currentTimeline && currentTimeline.length >= 0) {
          return blockstack.putFile(TIMELINE_FILE, JSON.stringify(currentTimeline.concat(timeline)))
        } else {
          return blockstack.putFile(TIMELINE_FILE, JSON.stringify(timeline))
        }
      })
    }
  }

  parseCDA(content) {
    const { profile, timeline } = ParseCDA(content)

    this.importProfile(profile)
    this.importTimeline(timeline)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} style={{marginTop: 60}}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Settings
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Import Apple Health CDA XML
              <input
                accept="text/xml"
                className={classes.input}
                id="upload-xml"
                type="file"
                onChange={this.handleFileChosen}
              />
              <label htmlFor="upload-xml">
                <Button variant="contained" component="span" className={classes.button}>
                  Import CDA
                </Button>
              </label>
            </Paper>
          </Grid>
        </Grid>
    </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);

