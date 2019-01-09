import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TimelineIcon from "@material-ui/icons/Timeline";
import Share from "@material-ui/icons/Share";
import BorderBottom from "@material-ui/icons/BorderBottom";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import moment from 'moment';
import qrGoolge from './qrcode.45596517.png';

const blockstack = require('blockstack');

const STORAGE_FILE = 'profile.json'


const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
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
      user: blockstack.loadUserData(),
      sundlyProfile: {
        firstName: '',
        lastName: '',
        sex: '',
        dob: '',
      },
      open: false,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  fetchProfile() {
    blockstack.getFile(STORAGE_FILE).then((profileText) => {
      const sundlyProfile = JSON.parse(profileText)
      if(!!sundlyProfile && !!sundlyProfile.firstName) {
        this.setState({ sundlyProfile })
      }
    })
  }

  saveProfile() {
    const { sundlyProfile } = this.state

    return blockstack.putFile(STORAGE_FILE, JSON.stringify(sundlyProfile))
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleChange(event) {
    const target = event.target

    this.setState(prev => ({
      sundlyProfile: {
        ...prev.sundlyProfile,
        [target.name]: target.value,
      }
    }), () => this.saveProfile())
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24} style={{marginTop: 60}}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Avatar
              src={this.state.user.profile.image && this.state.user.profile.image[0].contentUrl}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <code>{this.state.user.username}</code>
            <br />
            <Typography variant="caption" gutterBottom>
              {this.state.user.profile.description}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="title" gutterBottom>
              Clinical Profile:
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="firstName">First Name</InputLabel>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  autoComplete="fname"
                  value={this.state.sundlyProfile.firstName}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="lastName">Last Name</InputLabel>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.sundlyProfile.lastName}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="sex">
                  Biological Sex
                </InputLabel>
                <Select
                  value={this.state.sundlyProfile.sex}
                  onChange={this.handleChange}
                  input={<Input name="sex" id="sex" />}
                >
                  <MenuItem value={'m'}>Male</MenuItem>
                  <MenuItem value={'f'}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="dob">Date of Birth</InputLabel>
                <TextField
                  required
                  type="date"
                  id="dob"
                  name="dob"
                  autoComplete="dob"
                  value={moment(this.state.sundlyProfile.dob).format('YYYY-MM-DD')}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </FormControl>
            </form>
          </Paper>
          <Grid container spacing={24} style={{ marginLeft: 20, marginTop: 10}}>
            <Grid item xs={4}>
              <Button variant="fab" color={`primary`}>
                <Link to="/timeline">
                  <TimelineIcon />
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
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
