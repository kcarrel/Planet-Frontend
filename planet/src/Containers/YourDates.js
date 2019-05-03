import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
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
  gridList: {
    width: 1000,
    height: '100vh',
   justify: 'center',
 },
});

class YourDates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      dateDeleted: null
    }
    this.fetchDates()
    this.deleteEvent = this.deleteEvent.bind(this)
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
      this.setState({dates})
    })
  }

  deleteEvent(data) {
    fetch(`https://dateplanet.herokuapp.com/date_posts/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(alert("Date deleted!"))
    .then(window.location.href='/yourdates')
  }


  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>

        <GridList id="list" cellHeight={200} cellPadding={50} className={classes.gridList}>
        {this.state.dates.map(data => {
          return <GridListTile style={{width: 400, height: 400}} key={data.id}>
          <Card className={classes.card}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="10%"
                image={require("../images/duck.png")}
                title="Date Planet"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  <b>{data.title} </b> on {data.date}
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
                alignItems="center"
              >
              <Button
                onClick={localStorage.setItem("hi", data.id)}
                component={Link} to="/editDate"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}>
                Edit
              </Button>
              <Button
                onClick={() => this.deleteEvent(data)}
                type="submit"
                variant="contained"
                color="primary"
                spacing={16}
                className={classes.submit}>
                Delete
              </Button>
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

YourDates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YourDates);
