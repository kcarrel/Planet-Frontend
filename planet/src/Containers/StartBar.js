import React from 'react';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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


class StartBar extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#04151F' }}>

          <Button component={Link} to="/signup" color="inherit">Signup</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          
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
