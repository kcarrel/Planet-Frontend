import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router-dom';


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
      height: '100vh',
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
    maxWidth: 1000,
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
  gridList: {
   width: 1000,
   height: '100vh',
   justify: 'center',
 },
});

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelp: [],
      ticketmaster: [],
      location: '',
      category: '',
      yelpActive: null
    }
  }



  //fetch down Yelp suggestions(20 at a time)
  fetchYelp() {
    let location = localStorage.getItem("UserLocation")
    fetch(`http://localhost:3000/yelp/${location}_${this.state.category}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      },
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({yelp: data.businesses})
    })
  }

  //fetch down TicketMaster suggestions
  fetchTicketmaster() {
    let ticketmaster = localStorage.getItem("ticketmaster")
    let category = this.state.category
    let location = localStorage.getItem("UserLocation")
    fetch(`http://localhost:3000/ticketmaster/${location}_${this.state.category}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      },
    })
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
    if (this.state.category === 'sports' || this.state.category === 'music') {
      this.setState({yelpActive: false})
      this.fetchTicketmaster()
    } else {
      this.setState({yelpActive: true})
      this.fetchYelp()

    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
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
                <MenuItem key='sports' value='sports'>
                  Sports
                </MenuItem>

                <MenuItem key='music' value='music'>
                  Music
                </MenuItem>

                <MenuItem key='animals' value='animals'>
                  Animals
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

                <MenuItem key='coffee' value='coffee'>
                  Coffee
                </MenuItem>

                <MenuItem key='parks' value='parks'>
                  Outdoors
                </MenuItem>

                <MenuItem key='nightlife' value='nightlife'>
                  Nightlife
                </MenuItem>


                </TextField>
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

        <GridList id="list" cellWidth={900} cellHeight={400} cellPadding={20} className={classes.gridList}>

        { this.state.yelpActive ? (
          this.state.yelp.map(data => {
          return <GridListTile style={{width: 400}} key={data.id}>
          <a target="_blank" rel="noopener noreferrer" href={data.url}>
          <Card style={{width: 500, height:500}} className={classes.card}>
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
        </GridListTile>

        })
        ) : (
          this.state.ticketmaster.map(data => {
            let url = data.url
          return <GridListTile style={{width: 400}} key={data.id}>
          <a target="_blank" rel="noopener noreferrer" href={url}>
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
        </GridListTile>

        })
      )}
    </GridList>

    </main>
    );
  }
}

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
