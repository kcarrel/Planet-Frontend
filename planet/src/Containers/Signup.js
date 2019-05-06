import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Redirect } from 'react-router-dom';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


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
      width: 700,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
  },
});

  class Signup extends Component {
    constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      name: '',
      pronouns: '',
      age: '',
      max_age_preference: '',
      min_age_preference: '',
      location: '',
      image: '',
      biography: '',
      gender_preference: '',
      gender_preference_men: null,
      gender_preference_women: null,
      gender_preference_nonbinary: null
    }
    this.signupUser = this.signupUser.bind(this)

  }

  handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    this.setState({[ev.target.name]: value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    if (this.state.age < 21 || this.state.max_age_preference < 21 || this.state.min_age_preference < 21) {
      alert("Users must be 21 or older to use this application. Please update your selections.")
    } else if(
    this.state.email !== '' &&
    this.state.password !== '' &&
    this.state.name !== '' &&
    this.state.pronouns !== '' &&
    this.state.age !== '' &&
    this.state.max_age_preference !== '' &&
    this.state.min_age_preference !== '' &&
    this.state.location !== '' &&
    this.state.image !== '' &&
    this.state.biography !== '') {
      this.handlePref()
    } else {
      alert("Please fill out all fields!")
      window.location.href="/signup"
    }
  }
    //sorting the specified gender of user and matching user's gender preferences for partner before persisting to database

    handlePref() {
      if (this.state.gender_preference_men && this.state.gender_preference_women && this.state.gender_preference_nonbinary) {
      this.setState({gender_preference: 'all'})
      this.signupUser()
    } else if (this.state.gender_preference_men && this.state.gender_preference_women)   {
      this.setState({gender_preference: 'mw'}, () => {
        this.signupUser()
      })
    } else if (this.state.gender_preference_men && this.state.gender_preference_nonbinary) {
      this.setState({gender_preference: 'mn'}, () => {
        this.signupUser()
      })
    } else if (this.state.gender_preference_women && this.state.gender_preference_nonbinary) {
      this.setState({gender_preference: 'wn'}, () => {
        this.signupUser()
      })
    } else if (this.state.gender_preference_men) {
      this.setState({gender_preference: 'm'}, () => {
        this.signupUser()
      })
    } else if (this.state.gender_preference_women) {
      this.setState({gender_preference: 'w'}, () => {
        this.signupUser()
      })
    } else {
      this.setState({gender_preference: 'n'}, () => {
        this.signupUser()
      })
    }
  }

    signupUser() {
      fetch('https://dateplanet.herokuapp.com/users', {
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
          localStorage.setItem('Token', json.jwt);
          localStorage.setItem('Email', json.user.email);
          this.createProfile()
      }
    })
  }

  createProfile() {
    fetch('https://dateplanet.herokuapp.com/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    },
    body: JSON.stringify({
      profile: {
        user_id: localStorage.getItem("UserID"),
        name: this.state.name,
        pronouns: this.state.pronouns,
        age: this.state.age,
        max_age_preference: this.state.max_age_preference,
        min_age_preference: this.state.min_age_preference,
        location: this.state.location,
        image: this.state.image,
        biography: this.state.biography,
        gender_preference: this.state.gender_preference
        }
      })
    })
    .then(r => r.json())
    .then(json => {
      if (json) {
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
      }
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
        <Avatar style={{color: 'FF7F68'}}className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form className={classes.form}>
          <FormControl  margin="normal" >
            <InputLabel >Name</InputLabel>
            <Input onChange={this.handleChange} name="name" type="text" id="name" autoComplete="name" className={classes.textField} margin="normal"
              />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Email Address</InputLabel>
            <Input onChange={this.handleChange} id="email" type="text" name="email" autoComplete="email" className={classes.textField} margin="normal" />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Password</InputLabel>
            <Input onChange={this.handleChange} name="password" type="text" id="password" autoComplete="current-password" className={classes.textField} margin="normal" />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Image Url</InputLabel>
            <Input onChange={this.handleChange} name="image" type="text" id="image" className={classes.textField} margin="normal" />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Location</InputLabel>
            <Input onChange={this.handleChange} name="location" type="text" id="location" autoComplete="current-location" className={classes.textField} margin="normal" />
          </FormControl>
          <FormControl margin="normal" >

              <TextField
              id="pronouns"
              select
              label="Select"
              className={classes.textField}
              value={this.state.pronouns}
              name="pronouns"
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Your preferred pronouns"
              margin="normal"
            >
            <MenuItem key='she/her' value='she/her'>
              She/Her
            </MenuItem>

            <MenuItem key='he/him' value='he/him'>
              He/Him
            </MenuItem>

            <MenuItem key='they/them' value='they/them'>
              They/Them
            </MenuItem>

        </TextField>
      </FormControl>



      <FormGroup row>
        <InputLabel >Who are you interested in?</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              type="checkbox"
              name='gender_preference_men'
              onChange={this.handleChange}
              value={this.state.gender_preference_men}
            />
          }
          label="Men"
        />
        <FormControlLabel
          control={
            <Checkbox
              type="checkbox"
              name='gender_preference_women'
              onChange={this.handleChange}
              value={this.state.gender_preference_women}
            />
          }
          label="Women"
        />
        <FormControlLabel
          control={
            <Checkbox
              type="checkbox"
              name='gender_preference_nonbinary'
              onChange={this.handleChange}
              value={this.state.gender_preference_nonbinary}
            />
          }
          label="Non-binary people"
        />
      </FormGroup>

    <br/>
    <TextField
      id="standard-number"
      label="Age"
      name='age'
      value={this.state.age}
      onChange={this.handleChange}
      type="number"
      InputProps={{ inputProps: { min: 21, max: 1000 } }}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />

        <TextField
          id="standard-number"
          label="Minimum Age Preference"
          name='min_age_preference'
          value={this.state.min_age_preference}
          InputProps={{ inputProps: { min: 21, max: 1000 } }}
          onChange={this.handleChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
          <TextField
            id="standard-number"
            InputProps={{ inputProps: { min: 21, max: 100 } }}
            label="Maximum Age Preference"
            name='max_age_preference'
            value={this.state.max_age_preference}
            onChange={this.handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          <TextField
            name='biography'
            placeholder="Describe yourself to future suitors!"
            multiline={true}
            rows={4}
            rowsMax={8}
            className={classes.textArea}
            onChange={this.handleChange}
          />
          <MuiThemeProvider theme={theme}>

          <Button
            onClick={(ev) => this.handleSubmit(ev)}
            type="submit"
            sizeLarge
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Signup
          </Button>
        </MuiThemeProvider>

        </form>
      </Paper>
    </main>
  );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
