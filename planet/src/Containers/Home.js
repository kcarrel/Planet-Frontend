import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
};

class Home extends Component {
  


  render() {
    const { classes } = this.props;
    return (
    <main className={classes.main}>

      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="600"
            image={require("../images/home.png")}
            title="Date Planet"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              DatePlanet
            </Typography>
            <Typography component="p">
              A space to make connections
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    </main>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);