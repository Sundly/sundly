import React from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit * 4,
  },
  buttonLogo: {
    height: '20px',
    marginRight: theme.spacing.unit
  },
  logo: {
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
  },
})

const Login = props => {
  const { classes, login } = props

  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={4}>
          <Paper className={classes.root} elevation={1}>
            <img src="/images/logo_alpha.png" className={classes.logo} alt="Logo" />
            <Typography variant="subtitle2" gutterBottom>
              Encrypted &amp; decentralized personal health records.
              Built on Blockstack and powered by Blockchain.
            </Typography>
            <Button onClick={login} variant="contained" color="primary" className={classes.button}>
              <img src="/images/blockstack-bug-rounded.svg" className={classes.buttonLogo} alt="Sign In" />
              Sign In with Blockstack
            </Button>
            <Divider light={true} className={classes.divider}/>
            <Typography variant="caption" gutterBottom>
              Don't have an account? <a href="#" style={{cursor: "pointer"}} onClick={login}>Sign Up</a>
            </Typography>
            <Typography variant="caption" gutterBottom>
              <a href="https://sundly.co/">About Sundly</a>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

