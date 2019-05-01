import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


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

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      messages: [],
      haveMessages: null
    }
    this.fetchDates()
    this.deleteEvent = this.deleteEvent.bind(this)
  }

  //delete a
  deleteEvent(data) {
    fetch(`http://localhost:3000/date_interests/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    this.fetchDates()
  }

  //confirm a date interest and create a date decision
  createResponse(data) {
    fetch('http://localhost:3000/date_decisions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    },
    body: JSON.stringify({
      date_decision: {
        user_id: localStorage.getItem("UserID"),
        date_interest_id: data.id,
        decision: true
        }
      })
    })
  }




  //fetch down all Dates for a user
  fetchDates() {
    fetch('http://localhost:3000/seeDates', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(dates => {
      this.setState({
        dates
      }, () => {
        this.loopDates()
      })
    })
  }

  loopDates() {
    let datesLength = this.state.dates.length
    for (var i = 0; i < datesLength; i++) {
      this.fetchInterest(this.state.dates[i])
    }
  }


  //fetch down all date interests for a date that the current user has posted
  fetchInterest(date) {
    fetch(`http://localhost:3000/fetch/${date.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(interest => {
      let jsonlength = interest.length
      for (let i = 0; i < jsonlength; i ++) {
        this.state.messages.push(interest[i])
      }
      this.setState({
        messages: this.state.messages
        })
    })
  }


  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>


        {this.state.messages.map(data => {
          return <Card className={classes.card}>
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
                  {data.date_post.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.date_post.date}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.message}
                </Typography>
              </CardContent>

            <Button
              onClick={() => this.createResponse(data)}
              component={Link} to="/dateposts"
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}>
              Confirm
            </Button>

            <Button
              onClick={() => this.deleteEvent(data)}
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}>
              Deny
            </Button>
          </Card>
        })
      }
    </main>
   );
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messages);
