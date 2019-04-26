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

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelp: [],
      ticketmaster: [],
      location: '',
      date: '',
      category: '',
      yelpActive: null
    }
  }



  //fetch down Yelp suggestions(20 at a time)
  fetchYelp() {
    let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bar&location=Queen_Anne_Seattle"
    fetch(url, {
      'headers': {
        'Authorization': "Bearer YAcnqZXeGC2n8VCiRTTDaR7Cm5PSV1ZPt9fakWKzAttuZps7bi_AasVaM0Hs0J7PF7OSJstG3fv6kQC_k5cC6W0W3LljzjlU65wNL2jK2Hlu1PcZ7s9G4xiFPjm_XHYx"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({yelp: data.businesses})
    })
  }

  //fetch down TicketMaster suggestions
  fetchTicketmaster() {
    let category = this.state.category
    let location = localStorage.getItem("UserLocation")
    let date = this.state.date
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${location}&apikey=hwrR44RmwHzBP1VteR2Adcd5ObVsALUR`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({ticketmaster: data._embedded.events})
    })
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    if (this.state.category === 'event') {
      this.setState({yelpActive: false})
      this.fetchTicketmaster()
    } else {
      this.setState({yelpActive: true})
      this.fetchYelp()

    }
  }

  render() {
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h5">
            Date Suggestion Generator
          </Typography>
          <form className={classes.form}>
          <FormControl margin="normal" >

              <TextField
              id="category"
              select
              label="Select"
              className={classes.textField}
              value={this.state.category}
              name="category"
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Type of date"
              margin="normal"
                >
                <MenuItem key='event' value='event'>
                  Event(concert, show, etc...)
                </MenuItem>

                <MenuItem key='restaurant' value='restaurant'>
                  Restaurant
                </MenuItem>

                <MenuItem key='bar' value='bar'>
                  Bar
                </MenuItem>

                <MenuItem key='fitness' value='fitness'>
                  Fitness
                </MenuItem>

                <MenuItem key='arts' value='arts'>
                  Art/Culture
                </MenuItem>

                </TextField>
            </FormControl>

            <FormControl  margin="normal" >
            <TextField
              id="datetime-local"
              type="date"
              name='date'
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </FormControl>


            <Button
              onClick={this.handleSubmit}
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}>
              Generate
            </Button>
          </form>
        </Paper>

        { this.state.yelpActive ? (
          this.state.yelp.map(data => {
          return <a target="_blank" href={data.url}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="200"
                src={(data.image_url)}
                title="Date Planet"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.location.display_address[0]} {data.location.display_address[1]}
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
          </a>
        })
        ) : (
          this.state.ticketmaster.map(data => {
            let url = data.url
          return <a target="_blank" href={url}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="50%"
                src={(data.images[0].url)}
                title="Date Planet"
                target={data.url}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  {data.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.dates.localDate}
                </Typography>

              </CardContent>
            </CardActionArea>

          </Card>
          </a>
        })
      )}

    </main>
    );
  }
}

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
