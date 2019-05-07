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
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

import red from '@material-ui/core/colors/red';
import { Link, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});


const styles = theme => ({

  main: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
      width: 1000,
      height: '90vh',
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    maxWidth: 400,
    height: 75,
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
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: 900,
    minHeight: 500,
    alignContent: 'center',
    justify: 'center',
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
   height: '70vh',
   justify: 'center',
 },
});

class DatePosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      dates: [],
      confirmed: [],
      haveDates: null,
      message:'',
      search: ''
    }
    this.fetchProfiles()
    this.handleInterest = this.handleInterest.bind(this)
  }



  //fetch down all profiles that are not the current users
  fetchProfiles() {
    //gotta send the token over
    fetch('https://dateplanet.herokuapp.com/all', {
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
    profiles.forEach(profile => {
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
    this.state.matches.forEach(match => {
    fetch((`https://dateplanet.herokuapp.com/date_posts/${match.user_id}`), {
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
      let sorted = this.state.dates.sort((a, b) => (a.user_id > b.user_id) ? 1 : -1)
      this.setState({
        dates: sorted
        })
      })
      this.setState({haveDates: true})
    })
  }


  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleInterest(ev, data) {
    fetch('https://dateplanet.herokuapp.com/date_interests', {
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

    let filtered = this.state.dates.filter( date => date.description.toLowerCase().includes(this.state.search.toLowerCase()) || date.title.toLowerCase().includes(this.state.search.toLowerCase()) || date.category.toLowerCase().includes(this.state.search.toLowerCase()))
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>

        <form className={classes.form}>
          <FormControl  margin="normal" >
            <InputLabel >Search by keyword</InputLabel>
            <Input onChange={this.handleChange} name="search" type="text" id="search" autoComplete="Search" className={classes.textField} margin="normal"
              />
          </FormControl>
        </form>
        </Paper>
        <GridList id="list" cellHeight={500} cellPadding={20} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 100 }}>
          <ListSubheader style={{backgroundColor: 'white', color: 'black'}} component="h1"><h2>Dates available in your area</h2></ListSubheader>
        </GridListTile>
        { this.state.haveDates ? (
          filtered.map(data => {
          return <GridListTile style={{width: 500, height:500}} className="tile" key={data.id}>
          <Card className={classes.card}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                image={require(`../images/${data.category}.png`)}
                title="Date Planet"
                id="picture"
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
            <MuiThemeProvider theme={theme}>

            <Button
              margin="normal"
              onClick={() => localStorage.setItem("profile", data.user_id)}
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
          </MuiThemeProvider>

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
