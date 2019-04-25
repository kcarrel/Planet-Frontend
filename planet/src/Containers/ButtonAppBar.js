import React from 'react';
import purple from '@material-ui/core/colors/purple';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import IconPlanet from '../images/iconplanet.png'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  leftButton: {
    marginRight: -12,
    marginRight: 20,  },
};


function ButtonAppBar(props) {
  const { classes } = props;


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#04151F' }}>
          <IconButton component={Link} to="/" className={classes.button} aria-label="Home">
            <img src={IconPlanet} alt="" width="46" height="42" />
          </IconButton>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>

          <Button component={Link} to="/signup" color="inherit">Signup</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/datepost" color="inherit">Create a Date</Button>
          <Button component={Link} to="/example" color="inherit">See date example</Button>
          <Button component={Link} to="/suggestions" color="inherit">Date Suggestions</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
