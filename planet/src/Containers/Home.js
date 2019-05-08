import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import planet from '../images/iconplanet.png'
import Grid from '@material-ui/core/Grid';


const styles = {
  main: {
    display: 'block',
    overflow: 'scroll', // Fix IE 11 issue.
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  card: {
    minWidth: '300px',
    alignContent: 'center',
    justify: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    padding: 50
  },
};

class Home extends Component {

  render() {

    const { classes } = this.props;
    return (
    <main className={classes.main}>
      <Grid
        container spacing={24}
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid
        item
        justify="center"
        alignItems="center"
        >
      <img className="App-logo" id="responsive" src={planet} alt="Planet"/>
      </Grid>
      <Grid
        item

        xs={12}
        s={6}
        md={4}
        lg={12}
        flexJustify="center"
        alignItems="center"
        >
      <Card className={classes.card}>
        <CardActionArea>
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
      </Grid>
    </Grid>
    </main>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
