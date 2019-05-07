import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});


const styles = {
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
  card: {
    maxWidth: 1000,
    alignContent: 'center',
    justify: 'center',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  avatar: {
   margin: 10,
  },
  bigAvatar: {
   margin: 10,
   width: 90,
   height: 90,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '400',
  },
  gridList: {
   width: '100vh',
   height: '90vh',
   justify: 'center',
   margin: '16px'

 },
 contain: {
   margin: '16px'
 },

};

class SeeProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pronouns: '',
      age: '',
      location: '',
      image: '',
      biography: '',
      id: '',
      haveDates: null,
      dates: [],
      message: ''
    }
    this.fetchProfile()
  }

  fetchProfile() {
    fetch((`https://dateplanet.herokuapp.com/profiles/${localStorage.getItem('profile')}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        id: json.id,
        name: json.name,
        pronouns: json.pronouns,
        age: json.age,
        location: json.location,
        image: json.image,
        biography: json.biography,
      })
      this.fetchDates()
    })
  }
  
  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  fetchDates() {
    fetch((`https://dateplanet.herokuapp.com/date_posts/${this.state.id}`), {
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
      this.setState({
        dates: this.state.dates,
        haveDates: true
        })
      })
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
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    const { classes } = this.props;
    return (
    <main className={classes.main}>

      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Grid container justify="center" alignItems="center">
            <Avatar alt="profile icon" src={this.state.image} className={classes.bigAvatar} />
            </Grid>

            <Typography gutterBottom variant="h5" component="h2">
              <b>{this.state.name}</b> - {this.state.location}
            </Typography>
            <Typography component="p">
              {this.state.age} years old
            </Typography>
            <Typography component="p">
              <b>About {this.state.name}:</b> {this.state.biography}
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>


      <GridList id="list" cellHeight={500} cellPadding={20} className={classes.gridList}>
      { this.state.haveDates ? (
        this.state.dates.map(data => {
        return <GridListTile style={{minWidth: 600, minHeight:600}} className="tile" key={data.id}>
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
              <Grid id="contain" item xs={12}>
              <Grid
                  margin="16px"
                  marginHeight="16px"
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                >
          <TextField
            name='message'
            placeholder="Send the poster a message!"
            multiline={true}
            rows={4}
            className={classes.textArea}
            onChange={this.handleChange}
          />
          <MuiThemeProvider theme={theme}>

          <Button
            id="button"
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

SeeProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeeProfile);
