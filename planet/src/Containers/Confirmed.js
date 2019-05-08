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
import CardActionArea from '@material-ui/core/CardActionArea';
import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

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
   height: '90vh',
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
    fetch(`https://dateplanet.herokuapp.com/fetch_by_user/${localStorage.getItem("UserID")}`, {
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
    fetch(`https://dateplanet.herokuapp.com/find/${localStorage.getItem("UserID")}`, {
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
        fetch(`https://dateplanet.herokuapp.com/fetch_by_id/${interest.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
          })
          .then(response => response.json())
          .then(dates => {
            if (dates) {
              for (let i = 0; i < dates.length; i++) {
                if (dates[i].date_interest.date_post !== null) {
                  confirmed.push(dates[i])
                }
                this.setState({
                  respondedDates: confirmed,
                  haveResDates: true
                })
              }
            }
          })

      })
    }

  //fetch all date_interests that the current user has created(eg responded to a posted date)
  // then loop through date_interests to pull down date_decisions that match that interest_id




  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    //from material ui
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <GridList id="list" cellHeight={500} cellPadding={20} className={classes.gridList}>

        { this.state.haveResDates ? (
          this.state.respondedDates.map(data => {
          return <GridListTile style={{width: 400}} key={data.id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                id="picture"
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
                  Date's Profile
                </Button>
              </MuiThemeProvider>

              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>

        })
      ) : null }

      { this.state.haveUserDates ? (
        this.state.userDates.map(data => {
        return <GridListTile style={{width: 400}} key={data.id}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              id="picture"
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
              <MuiThemeProvider theme={theme}>

              <Button
                margin="normal"
                onClick={() => localStorage.setItem("profile", data.date_interest.user_id)}
                component={Link} to="/seeprofile"
                type="submit"
                sizeLarge
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Date's Profile
              </Button>
            </MuiThemeProvider>

            </CardContent>
          </CardActionArea>
        </Card>
      </GridListTile>

      })
      ) : null }
    </GridList>

     </main>
   );
  }
}

Confirmed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmed);
