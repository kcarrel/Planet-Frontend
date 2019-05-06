import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

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
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class Example extends Component {

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    const { classes } = this.props;
    return (
    <main className={classes.main}>

      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="300"
            image={require("../images/bars.png")}
            title="Date Planet"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              Greenlake, Dog and Drinks?
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              05/10/2019 at 6:30 PM
            </Typography>
            <Typography component="p">
              My dog, Smokey, and I would love to meet you at Greenlake on Monday for a walk around the lake then dinner and drinks at Shelter.
              Smokey is a friendly pitbull and I'm an equally friendly tech non-bro!
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    </main>
    );
  }
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Example);
