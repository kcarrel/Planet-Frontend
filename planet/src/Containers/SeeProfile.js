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

const styles = {
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 50,
    marginRight: 50,
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
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
  avatar: {
   margin: 10,
  },
  bigAvatar: {
   margin: 10,
   width: 90,
   height: 90,
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
      biography: ''
    }
    this.fetchProfile()
  }

  fetchProfile() {
    fetch((`http://localhost:3000/profiles/${localStorage.getItem('profile')}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        name: json.name,
        pronouns: json.pronouns,
        age: json.age,
        location: json.location,
        image: json.image,
        biography: json.biography,
      })
      console.log(this.state)
    })
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
    </main>
    );
  }
}

SeeProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeeProfile);
