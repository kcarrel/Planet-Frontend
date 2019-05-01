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
import { Redirect } from 'react-router-dom';

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


class ButtonAppBar extends React.Component {
  constructor() {
    super()
    this.state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    }
  };

  handleProfileMenuOpen = event => {
    event.preventDefault()
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  render () {

  const { anchorEl, mobileMoreAnchorEl } = this.state;
   const { classes } = this.props;
   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const renderMenu = (
     <Menu
       anchorEl={anchorEl}
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
       open={isMenuOpen}
       onClose={this.handleMenuClose}
     >
       <MenuItem component={Link} to="/profile" onClick={this.handleMenuClose}> Edit Profile</MenuItem>
       <MenuItem  component={Link} to="/" onClick={(ev) => this.props.clearApp(ev)}>Logout</MenuItem>
     </Menu>
   );

   const renderMobileMenu = (
     <Menu
       anchorEl={mobileMoreAnchorEl}
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
       open={isMobileMenuOpen}
       onClose={this.handleMenuClose}
     >
       <MenuItem onClick={(ev) => this.handleMobileMenuClose(ev)}>
         <Button component={Link} to="/datepost" color="inherit">Create a Date</Button>
       </MenuItem>
       <MenuItem onClick={(ev) => this.handleMobileMenuClose(ev)}>
         <Button component={Link} to="/example" color="inherit">See date example</Button>
       </MenuItem>
       <MenuItem onClick={(ev) => this.handleProfileMenuOpen(ev)}>
         <Button component={Link} to="/dateposts" color="inherit">Date Posts</Button>
       </MenuItem>
       <MenuItem onClick={(ev) => this.handleProfileMenuOpen(ev)}>
         <Button component={Link} to="/suggestions" color="inherit">Date Suggestions</Button>
       </MenuItem>
       <MenuItem onClick={(ev) => this.handleProfileMenuOpen(ev)}>
        <Button component={Link} to="/yourdates" color="inherit">Your Dates</Button>
       </MenuItem>
     </Menu>
   );
  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: '#04151F' }}>
            <IconButton component={Link} to="/" onClick={(ev) => this.props.clearApp(ev)} className={classes.button} aria-label="Home">
              <img src={IconPlanet} alt="" width="46" height="42" />
            </IconButton>


            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton component={Link} to="/messages" color="inherit">
                <MailIcon/>
              </IconButton>

              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
