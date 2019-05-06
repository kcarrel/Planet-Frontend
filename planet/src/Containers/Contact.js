import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  main: {
    display: 'block', // Fix IE 11 issue.
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
              Contact DatePlanet Team
            </Typography>
            <Typography component="p">
            <a href='https://twitter.com/ktcarrel18'>Twitter</a>
            </Typography>
            <Typography component="p">
            <a href='https://www.linkedin.com/in/katie-carrel/'>LinkedIn</a>
            </Typography>
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
