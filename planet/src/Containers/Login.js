import React, { Component  } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    //post to user database
      fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        if (json.user) {
          localStorage.setItem('UserID', json.user.id);
          localStorage.setItem('UserEmail', json.user.email);
          localStorage.setItem('Token', json.token);
          this.getProfile()
        } else {
          alert("You fucked up try again")
        }
      })
    }

  getProfile() {
    fetch((`http://localhost:3000/profiles/${localStorage.getItem('UserID')}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(r => r.json())
    .then(json => {
      localStorage.setItem('UserName', json.name);
      localStorage.setItem('UserLocation', json.location);
      localStorage.setItem('UserImage', json.image);
      localStorage.setItem('UserPronouns', json.pronouns);
      localStorage.setItem('UserAge', json.age);
      localStorage.setItem('UserMax', json.max_age_preference);
      localStorage.setItem('UserMin', json.min_age_preference);
      localStorage.setItem('UserBio', json.biography);
      localStorage.setItem('UserGenderPref', json.gender_preference);
      this.props.toggleLogin()
    })
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/dateposts'/>
    }
  const { classes } = this.props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel >Email Address</InputLabel>
            <Input id="email" name="email" onChange={this.handleChange} value={this.state.email} autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel >Password</InputLabel>
            <Input name="password" type="password" id="password" onChange={this.handleChange} value={this.state.password} autoComplete="current-password" />
          </FormControl>

          <Button
            onClick={this.handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>
    </main>
  );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
