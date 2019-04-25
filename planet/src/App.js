import React, { Component } from 'react';
import ButtonAppBar from './Containers/ButtonAppBar'
import Login from './Containers/Login'
import Signup from './Containers/Signup'

import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class App extends Component {
  constructor() {
    super()
  }

  //fetch down Yelp suggestions(20 at a time)
  fetchYelp() {
    let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bar&location=Queen_Anne_Seattle"
    fetch(url, {
      'headers': {
        'Authorization': "Bearer YAcnqZXeGC2n8VCiRTTDaR7Cm5PSV1ZPt9fakWKzAttuZps7bi_AasVaM0Hs0J7PF7OSJstG3fv6kQC_k5cC6W0W3LljzjlU65wNL2jK2Hlu1PcZ7s9G4xiFPjm_XHYx"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
  }

  //fetch down TicketMaster suggestions
  fetchTicketmaster() {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Seattle&apikey=hwrR44RmwHzBP1VteR2Adcd5ObVsALUR')
    .then(resp => resp.json())
    .then(data => {
      console.log(data._embedded.events[0].url)
    })
  }


 render () {
   this.fetchTicketmaster()
  return (
    <div className="App">

      <ButtonAppBar/>
      <Signup />
    </div>
    );
  }
}

export default App;
