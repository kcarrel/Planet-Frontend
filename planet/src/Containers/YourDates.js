import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

class YourDates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
    }
    this.fetchDates()
    this.deleteEvent = this.deleteEvent.bind(this)
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
      this.setState({dates})
    })
  }

  deleteEvent(data) {
    fetch(`http://localhost:3000/date_posts/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
  }


  render() {
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>


        {this.state.dates.map(data => {
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
                  {data.title} {data.date}
                </Typography>
                <Typography component="p">
                  {data.description}
                </Typography>
              </CardContent>

            <Button
              onClick={localStorage.setItem("hi", data.id)}
              component={Link} to="/editDate"
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}>
              Edit
            </Button>
            <Button
              onClick={() => this.deleteEvent(data)}
              type="submit"
              sizeLarge
              variant="contained"
              color="primary"
              className={classes.submit}>
              Delete
            </Button>
          </Card>
        })
      }
    </main>
    );
  }
}

YourDates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YourDates);
