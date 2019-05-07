import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  main: {
    display: 'block', // Fix IE 11 issue.
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  bigAvatar: {
   margin: 10,
   width: 90,
   height: 90,
  },
  card: {
    maxWidth: 900,
    alignContent: 'center',
    justify: 'center',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    padding: 50
  },
};

class Contact extends Component {
  render() {

    const { classes } = this.props;
    return (
    <main className={classes.main}>

      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Contact DatePlanet Creator
            </Typography>
            <Typography justify="center" margin="10px" component="p">
            <Avatar  alt="profile icon" src={require('../images/profile.png')} className={classes.bigAvatar} />
            </Typography>
            <Typography margin="10px" component="p">
             Date Planet was created by Katie Carrel as her capstone project for the Flatiron School Immersive Software Engineering Program.
            </Typography>
            <br></br>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
              <Grid
                  padding="10px"
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-end"
                >
            <Typography component="p">
            <img alt="twitter icon" src={require('../images/twitter.png')} style={{height: '50px'}} onClick={()=> window.open('https://twitter.com/ktcarrel18')}/>
            </Typography>
            <Typography component="p">
            <img alt="linkedin icon" src={require('../images/linkedin.png')} style={{height: '40px'}} onClick={()=> window.open('https://www.linkedin.com/in/katie-carrel/')}/>
            </Typography>
          </Grid>
          </Grid>
        </Grid>
          </CardContent>
        </CardActionArea>

      </Card>
    </main>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
