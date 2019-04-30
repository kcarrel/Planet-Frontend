import React, { Component } from 'react';
import ButtonAppBar from './Containers/ButtonAppBar'
import StartBar from './Containers/StartBar'

import Login from './Containers/Login'
import Signup from './Containers/Signup'
import Home from './Containers/Home'
import DatePost from './Containers/DatePost'
import Example from './Containers/Example'
import Suggestions from './Containers/Suggestions'
import DatePosts from './Containers/DatePosts'
import YourDates from './Containers/YourDates'
import EditDate from './Containers/EditDate'
import Messages from './Containers/Messages'
import Confirmed from './Containers/Confirmed'
import Profile from './Containers/EditProfile'
import SeeProfile from './Containers/SeeProfile'

import './App.css';


import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {




 render () {
  return (
    <div className="App">
      <Router>
        {(localStorage.getItem("UserID")) ?
          <ButtonAppBar/>
          :
          <StartBar/>
        }
        <Route exact path="/" component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/datepost' component={DatePost} />
        <Route exact path='/example' component={Example} />
        <Route exact path='/suggestions' component={Suggestions} />
        <Route exact path='/dateposts' component={DatePosts} />
        <Route exact path='/yourdates' component={YourDates} />
        <Route exact path='/editdate' component={EditDate} />
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/confirmed' component={Confirmed} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/seeprofile' component={SeeProfile} />

      </Router>


    </div>
    );
  }
}

export default App;
