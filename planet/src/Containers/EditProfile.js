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
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import red from '@material-ui/core/colors/red';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});


const styles = theme => ({
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
    overflow: 'scroll',
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
    overflow: 'scroll'
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

class EditProfile extends Component {
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

  }

  handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value

    this.setState({[ev.target.name]: value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    //sorting the specified gender of user and matching user's gender preferences for partner before persisting to database
      if (this.state.gender_preference_men && this.state.gender_preference_women)   {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mall'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wall'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nall'}, () => {
            this.patchUser()
          })
        }
      } else if (this.state.gender_preference_men && this.state.gender_preference_nonbinary) {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mmn'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wmn'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nmn'}, () => {
            this.patchUser()
          })
          //nonbinary
        }

      } else if (this.state.gender_preference_women && this.state.gender_preference_nonbinary) {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mwn'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wwn'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nwn'}, () => {
            this.patchUser()
          })
          //nonbinary
        }
      } else if (this.state.gender_preference_men) {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mm'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wm'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nm'}, () => {
            this.patchUser()
          })
          //nonbinary
        }
      } else if (this.state.gender_preference_women) {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mw'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'ww'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nw'}, () => {
            this.patchUser()
          })
          //nonbinary
        }
      } else if (this.state.gender_preference_women) {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mn'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wn'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nn'}, () => {
            this.patchUser()
          })
          //nonbinary
        }
      } else {
        if (this.state.pronouns === 'he/him') {
          this.setState({gender_preference: 'mall'}, () => {
            this.patchUser()
          })
        } else if (this.state.pronouns === 'she/her') {
          this.setState({gender_preference: 'wall'}, () => {
            this.patchUser()
          })
        } else {
          this.setState({gender_preference: 'nall'}, () => {
            this.patchUser()
          })
          //nonbinary
        }
      }
    }

    patchUser() {
      fetch(`https://dateplanet.herokuapp.com/users/${localStorage.getItem('UserID')}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`
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
        localStorage.setItem('UserEmail', json.email);
        this.patchProfile()
      })
    }

    patchProfile() {
      fetch(`https://dateplanet.herokuapp.com/profiles/${localStorage.getItem('UserID')}`, {
      method: 'PATCH',
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
        let pref = json.gender_preference.substr(1)
        localStorage.setItem('UserName', json.name);
        localStorage.setItem('UserLocation', json.location);
        localStorage.setItem('UserImage', json.image);
        localStorage.setItem('UserPronouns', json.pronouns);
        localStorage.setItem('UserAge', json.age);
        localStorage.setItem('UserMax', json.max_age_preference);
        localStorage.setItem('UserMin', json.min_age_preference);
        localStorage.setItem('UserBio', json.biography);
        localStorage.setItem('UserGenderPref', pref);
      })
      .then(alert("Profile has been edited!"))
      .then(window.location.href='/dateposts')
    }


  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
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
          Edit Your Profile
        </Typography>
        <form className={classes.form}>
          <FormControl  margin="normal" >
            <InputLabel >Name</InputLabel>
            <Input onChange={this.handleChange} name="name" type="text" id="name" autoComplete="name" className={classes.textField} margin="normal"
              placeholder={localStorage.getItem("UserName")}/>
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Email Address</InputLabel>
            <Input onChange={this.handleChange} id="email" type="text" name="email" autoComplete="email" className={classes.textField} margin="normal"
            placeholder={localStorage.getItem("UserEmail")}
            />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Password</InputLabel>
            <Input onChange={this.handleChange} name="password" type="text" id="password" autoComplete="current-password" className={classes.textField} margin="normal" />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Image Url</InputLabel>
            <Input placeholder={localStorage.getItem("UserImage")} onChange={this.handleChange} name="image" type="text" id="image" className={classes.textField} margin="normal" />
          </FormControl>

          <FormControl margin="normal" >
            <InputLabel >Location</InputLabel>
            <Input placeholder={localStorage.getItem("UserLocation")} onChange={this.handleChange} name="location" type="text" id="location" autoComplete="current-location" className={classes.textField} margin="normal" />
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
      placeholder={localStorage.getItem("UserAge")}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />

        <TextField
          placeholder={localStorage.getItem("UserMin")}
          id="standard-number"
          label="Minimum Age Preference"
          name='min_age_preference'
          value={this.state.min_age_preference}
          onChange={this.handleChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
          <TextField
            placeholder={localStorage.getItem("UserMax")}
            id="standard-number"
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
            placeholder={"Biography: "+ localStorage.getItem("UserBio")}
            multiline={true}
            rows={4}
            rowsMax={4}
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
            Submit
          </Button>
        </MuiThemeProvider>
        </form>
      </Paper>
    </main>
  );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
