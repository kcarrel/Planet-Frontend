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
});

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelp: [],
      ticketmaster: [],
      location: '',
      date: ''
    }
    this.fetchYelp()
    this.fetchTicketmaster()
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
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Seattle&apikey=hwrR44RmwHzBP1VteR2Adcd5ObVsALUR')
    .then(resp => resp.json())
    .then(data => {
      this.setState({ticketmaster: data._embedded.events})
    })
  }


  render() {

    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h5">
            Date Suggestion Generator
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



      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="600"
            image={require("../images/suggetions.png")}
            title="Date Planet"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              Greenlake, Dog and Drinks?
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              04/29/2019 at 6:30 PM
            </Typography>
            <Typography component="p">
              My dog, Smokey, and I would love to meet you at Greenlake on Monday for a walk around the lake then dinner and drinks at Shelter.
              Smokey is a friendly pitbull and I'm an equally friendly tech non-bro!
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    </main>
    );
  }
}

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
