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
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

import red from '@material-ui/core/colors/red';

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
    overflow: 'scroll',
      width: 1000,
      height: '80vh',
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    maxWidth: 400,
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
    marginTop: '5px',
    bottom: 0
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
    margin: '16px'
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
   height: '80vh',
   justify: 'center',
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
    fetch(`https://dateplanet.herokuapp.com/date_interests/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    this.fetchDates()
  }

  //confirm a date interest and create a date decision
  createResponse(data) {
    fetch('https://dateplanet.herokuapp.com/date_decisions', {
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
    fetch('https://dateplanet.herokuapp.com/seeDates', {
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
    fetch(`https://dateplanet.herokuapp.com/fetch/${date.id}`, {
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
      if (this.state.messages.length === 0) {
        alert('Generate some interest by posting a date!')
      } else {
      this.setState({
        messages: this.state.messages
        })
      }
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

        <GridList id="list" cellHeight={500} cellPadding={20} className={classes.gridList}>
        {this.state.messages.map(data => {
          return <GridListTile style={{width: 500, height:500}} className="tile" key={data.id}>
          <Card className={classes.card}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                image={require(`../images/${data.date_post.category}.png`)}
                title="Date Planet"
                id="picture"

              />
              <CardContent>
                <Typography variant="h5">
                  {data.date_post.title} on {data.date_post.date}
                </Typography>

                <Typography gutterBottom variant="h5" component="h2">
                  {data.message}
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
          </MuiThemeProvider>
        </Grid>
        </Grid>
      </Grid>
          </Card>
        </GridListTile>

        })
      }
    </GridList>

    </main>
   );
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messages);
