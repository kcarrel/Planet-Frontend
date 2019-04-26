import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 50,
    marginRight: 50,
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
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
  card: {
    maxWidth: 900,
    alignContent: 'center',
    justify: 'center',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DatePosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      dates: [],
      haveDates: null
    }
    this.fetchProfiles()
  }



  //fetch down all profiles that are not the current users
  fetchProfiles() {
    //gotta send the token over
    fetch('http://localhost:3000/all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(profiles => {
      this.findMatches(profiles)
    })
  }

  //find user_ids for profiles with pronoun+ gender pref matches with current_user
  findMatches(profiles) {
    let newMatches = []
    let userPref = localStorage.getItem("UserGenderPref")
    let userPronoun = ''
    if (localStorage.getItem("UserPronouns") === 'she/her') {
      userPronoun = 'w'
    } else if (localStorage.getItem("UserPronouns") === 'he/him') {
      userPronoun = 'm'
    } else {
      userPronoun = 'n'
    }
    profiles.map(profile => {
      let pronoun = ''
      if (profile.pronouns === 'she/her') {
        pronoun = 'w'
        if (userPref === 'all' && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        } else if (userPref.includes(pronoun) && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        }
      } else if (profile.pronouns === 'he/him') {
        pronoun = 'm'
        if (userPref === 'all' && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        } else if (userPref.includes(pronoun) && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        }
      } else {
        pronoun = 'n'
        if (userPref === 'all' && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        } else if (userPref.includes(pronoun) && (profile.gender_preference.includes(userPronoun) || profile.gender_preference === 'all')) {
          newMatches.push(profile)
        }
      }

    })
    this.setState({
      matches: newMatches
    }, () => {
      this.fetchDates()
    })
  }
  //
  fetchDates() {
    let newDates = []
    this.state.matches.map(match => {
    fetch((`http://localhost:3000/date_posts/${match.user_id}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.state.dates.push(json)
      this.setState({
        dates: this.state.dates
        })
      })
      this.setState({haveDates: true})
    })
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }



  render() {
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>


        { this.state.haveDates ? (
          this.state.dates.map(data => {
          return <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="10%"
                image={require("../images/duck.png")}
                title="Date Planet"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.title} {data.date}
                </Typography>
                <Typography component="p">
                  {data.description}
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
        })
      ) : (
        null
      )
      }
    </main>
    );
  }
}

DatePosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePosts);
