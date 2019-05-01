import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardActionArea from '@material-ui/core/CardActionArea';


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
   width: 900,
   height: 900,
   justify: 'center',
 },
});

class Confirmed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userDates: [],
      respondedDates: [],
      haveUserDates: null,
      haveResDates: null,
      interests: []
    }
    this.fetchConfirmedByUser()
    this.fetchConfirmedByPoster()
  }



  //fetch down all confirmed DateDecisions that were posted by current user
  fetchConfirmedByUser() {
    fetch(`http://localhost:3000/fetch_by_user/${localStorage.getItem("UserID")}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(dates => {
      if (dates.length > 0) {
        this.setState({
        userDates: dates,
        haveUserDates: true
        })
      }
    })
  }
  //fetch down all the DateResponses that current user has created to compare
  // against DateDecisions
  fetchConfirmedByPoster() {
    fetch(`http://localhost:3000/find/${localStorage.getItem("UserID")}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(dates => {
      this.setState({interests: dates})
      this.fetchDecisions()
      })
    }


    //takes in an array of interest ids to find confirmed dates by
    // a date decision will not exist unless it is a confirmation
    fetchDecisions() {
      let confirmed = []
      this.state.interests.forEach(interest => {
        fetch(`http://localhost:3000/fetch_by_id/${interest.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
          })
          .then(response => response.json())
          .then(dates => {
            if (dates.length > 0 ) {
              confirmed.push(dates[0])
              this.setState({
                respondedDates: confirmed,
                haveResDates: true
              })
            }
          })
        })
    }

  //fetch all date_interests that the current user has created(eg responded to a posted date)
  // then loop through date_interests to pull down date_decisions that match that interest_id




  render() {

    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        { this.state.haveResDates ? (
          this.state.respondedDates.map(data => {
          return <GridListTile style={{width: 400}} key={data.id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="10%"
                image={require(`../images/${data.date_interest.date_post.category}.png`)}
                title="Date Planet"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <b>{data.date_interest.date_post.title}</b> on {data.date_interest.date_post.date}
                </Typography>
                <Typography component="p">
                  {data.date_interest.date_post.description}
                </Typography>

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
                  Date's Profile
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>

        })
      ) : null }
     </main>
   );
  }
}

Confirmed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmed);
