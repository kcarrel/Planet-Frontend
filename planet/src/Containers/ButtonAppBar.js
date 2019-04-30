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


class ButtonAppBar extends React.Component {
  constructor() {
    super()
    this.state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    }
  };

  handleProfileMenuOpen = event => {
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
       <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
       <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
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
       <MenuItem onClick={this.handleMobileMenuClose}>
         <IconButton color="inherit">
           <Badge badgeContent={4} color="secondary">
             <MailIcon />
           </Badge>
         </IconButton>
         <p>Messages</p>
       </MenuItem>
       <MenuItem onClick={this.handleMobileMenuClose}>
         <IconButton color="inherit">
           <Badge badgeContent={11} color="secondary">
             <NotificationsIcon />
           </Badge>
         </IconButton>
         <p>Notifications</p>
       </MenuItem>
       <MenuItem onClick={this.handleProfileMenuOpen}>
         <IconButton color="inherit">
           <AccountCircle />
         </IconButton>
         <p>Profile</p>
       </MenuItem>
     </Menu>
   );
  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: '#04151F' }}>
            <IconButton component={Link} to="/" className={classes.button} aria-label="Home">
              <img src={IconPlanet} alt="" width="46" height="42" />
            </IconButton>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
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
