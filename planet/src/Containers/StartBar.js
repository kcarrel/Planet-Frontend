import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import IconPlanet from '../images/iconplanet.png'

const styles = {
  root: {
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


class StartBar extends React.Component {




  render () {
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar id="toolbar" style={{ backgroundColor: '#04151F' }}>
          <Button className="startButton" component={Link} to="/signup" color="inherit">Signup</Button>
          <Button className="startButton" component={Link} to="/login" color="inherit">Login</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

StartBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartBar);
