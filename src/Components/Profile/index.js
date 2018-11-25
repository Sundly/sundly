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
import BorderBottom from "@material-ui/icons/BorderBottom";
import Modal from '@material-ui/core/Modal';

//Image
import qrGoolge from './qrcode.45596517.png';

const blockstack = require('blockstack');

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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(0%, 50%)`,
    border: 'solid',
    background: 'white'
  };
}

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: blockstack.loadUserData()
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{marginTop: 60, position: "absolute", left: 0, right: 0, bottom: 0}}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  disabled
                  id="name"
                  className={classes.textField}
                  margin="normal"
                />
              </form>
            </Paper>
            <Grid container spacing={24} style={{ marginLeft: 20, marginTop: 10}}>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <Link to="/summary">
                    <LocalHospital />
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <Link to="/contacts">
                    <Share />
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <BorderBottom onClick={this.handleOpen} />
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div style={getModalStyle()}>
                      <img src={qrGoolge} alt="google"/>
                    </div>
                  </Modal>
                </Button>
              </Grid>
            </Grid>
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
