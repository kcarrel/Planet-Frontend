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
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: 4,
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
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
    backgroundColor: '#F23A2F',
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
      password: '',
      hasTyped: false
    }
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
    this.setState({hasTyped: true})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    //post to user database
      fetch('https://dateplanet.herokuapp.com/profile', {
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
          localStorage.setItem('ticketmaster', json.ticketmaster);
          localStorage.setItem('yelp', json.yelp);
          localStorage.setItem('UserID', json.user.id);
          localStorage.setItem('UserEmail', json.user.email);
          localStorage.setItem('Token', json.token);
          this.getProfile()
        } else {
          alert("User information not found. Please try again.")
        }
      })
    }

  getProfile() {
    fetch((`https://dateplanet.herokuapp.com/profiles/${localStorage.getItem('UserID')}`), {
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
    } else if (!this.state.hasTyped) {
      window.alert("Test DatePlanet today using the email address: Test@email.com and password: test")
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
          <MuiThemeProvider theme={theme}>

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
        </MuiThemeProvider>

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
