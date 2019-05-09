import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

class About extends Component {
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
      <Card style={{height: '50%'}}className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              About DatePlanet
            </Typography>
            <Typography component="p">
              This is a space to make connections by finding commonality through planning and posting dates or responding to dates created by other users. Rather than a user's first interaction being with another user's profile pictures and a biography the purpose of this application is to encourage users to plan(et) and be open to new experiences with potential suitors in their orbit.
            </Typography>
            <br></br>
            </CardContent>
          </CardActionArea>
        </Card>

        { localStorage.getItem("UserID") ? (
        <Card style={{height: '50%'}}className={classes.card}>
          <CardActionArea>
            <CardContent>
            <Typography variant="h5">
              <b>How to use DatePlanet</b>
            </Typography>
            <Typography component="p">
              See and respond to <a href='/dateposts'>dates</a> available in your area! Dates shown match your user preferences and vice versa.
              <a href='/create_a_date'> Create dates</a> that you would like to go on! Need some guidance? Check out our <a href="/example">example</a> or <a href='/suggestions'> date suggestion generator</a>!
              If you post a date that receives interest from other user's you will see a message <a href='/messages'>here</a> that you can choose to deny or accept. Any dates that have been confirmed by both parties will show up <a href='/confirmed'> here</a>!
            </Typography>
            <Typography component="p">

            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ) : (
      null
    )}
      </Grid>
    </Grid>

    </main>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
