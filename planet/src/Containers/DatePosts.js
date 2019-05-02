import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Link, Redirect } from 'react-router-dom';

const eventImages = ['event', 'event1', 'event2']
const barImages = ['bar', 'bar1', 'bar2', 'bar3', 'bar4', 'bar5']
const restaurantImages = ['eat', 'eat1', 'eat2', 'eat3', 'eat4', 'eat5', 'eat6', 'eat7']
const fitnessImages = ['fit', 'fit0', 'fit1', 'fit2', 'fit3', 'fit4', 'fit5']
const artsImages = ['art0', 'art1', 'art2', 'art3', 'art4', 'art5']

const styles = theme => ({

  main: {
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginLeft: 50,
    marginRight: 50,
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    maxWidth: 400,
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
    minHeight: 500,
    alignContent: 'center',
    justify: 'center',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
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
  gridList: {
   width: 1000,
   height: 1000,
   justify: 'center',

 },
});

class DatePosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      dates: [],
      haveDates: null,
      message:''
    }
    this.fetchProfiles()
    this.handleInterest = this.handleInterest.bind(this)
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
      let jsonlength = json.length
      for (let i = 0; i < jsonlength; i ++) {
        this.state.dates.push(json[i])
      }
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

  handleInterest(ev, data) {
    fetch('http://localhost:3000/date_interests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify({
        date_interest: {
          date_post_id: data.id,
          message: this.state.message
          }
      })
    })
    .then(alert("Interest in date relayed!"))

  }



  render() {
    if (!localStorage.getItem("UserID")) {
      return <Redirect to='/'/>
    }
    localStorage.removeItem("profile")
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>

        <GridList id="list" cellHeight={500} cellPadding={20} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 100 }}>
          <ListSubheader style={{backgroundColor: 'white', color: 'black'}} component="h1"><h2>Dates available in your area</h2></ListSubheader>
        </GridListTile>
        { this.state.haveDates ? (
          this.state.dates.map(data => {
          return <GridListTile style={{width: 500, height:500}} className="tile" key={data.id}>
          <Card className={classes.card}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="10%"
                image={require('../images/duck.png')}
                title="Date Planet"
              />
              <CardContent>
                <Typography component="h2">
                  <b>{data.title}</b> on {data.date}
                </Typography>
                <Typography component="p">
                  {data.description}
                </Typography>
              </CardContent>
              <Grid container className={classes.root}>
                <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-end"
                  >
            <TextField
              name='message'
              placeholder="Send the poster a message!"
              multiline={true}
              rows={2}
              className={classes.textArea}
              onChange={this.handleChange}
            />

            <Button
              margin="normal"
              onClick={() => localStorage.setItem("profile", data.id)}
              component={Link} to="/seeprofile"
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              See Profile
            </Button>

            <Button
              margin="normal"
              onClick={(ev) => this.handleInterest(ev, data)}
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              I'm interested!
            </Button>
            </Grid>
            </Grid>
          </Grid>
          </Card>
        </GridListTile>

        })
      ) : (
        null
      )
      }
  </GridList>
    </main>
    );
  }
}

DatePosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePosts);
