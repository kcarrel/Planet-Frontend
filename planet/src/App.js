import React, { Component} from 'react';
import ButtonAppBar from './Containers/ButtonAppBar'
import StartBar from './Containers/StartBar'
import Login from './Containers/Login'
import Signup from './Containers/Signup'
import Home from './Containers/Home'
import DatePost from './Containers/DatePost'
import Example from './Containers/Example'
import About from './Containers/About'
import Contact from './Containers/Contact'
import Suggestions from './Containers/Suggestions'
import DatePosts from './Containers/DatePosts'
import YourDates from './Containers/YourDates'
import EditDate from './Containers/EditDate'
import Messages from './Containers/Messages'
import Confirmed from './Containers/Confirmed'
import Profile from './Containers/EditProfile'
import SeeProfile from './Containers/SeeProfile'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import EmailIcon from '@material-ui/icons/Email';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: this.check()
    }
  }

  check() {
    if (localStorage.getItem("UserID")) {
      return true
    } else {
      return false
    }
  }

  toggleLogin = () => {
    if (localStorage.getItem("UserID")) {
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  clearApp = (ev) => {
    ev.preventDefault()
    localStorage.clear()
    this.toggleLogin()
  }


 render () {

  return (

    <div className="App">
      <Router>
        {(this.state.loggedIn) ?
          <ButtonAppBar clearApp={this.clearApp} loggedIn={this.state.loggedIn}/>
          :
          <StartBar/>
        }
        <Route exact path='/' render={(props) => <Home {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/signup' render={(props) => <Signup {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/login' render={(props) => <Login {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/create_a_date' render={(props) => <DatePost {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/example' render={(props) => <Example {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/suggestions' render={(props) => <Suggestions {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/dateposts' render={(props) => <DatePosts {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/yourdates' render={(props) => <YourDates {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/editdate' render={(props) => <EditDate {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/messages' render={(props) => <Messages {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/confirmed' render={(props) => <Confirmed {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/profile' render={(props) => <Profile {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/seeprofile' render={(props) => <SeeProfile {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/about' render={(props) => <About {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />
        <Route exact path='/contact' render={(props) => <Contact {...props} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>} />

      </Router>
        <BottomNavigation
          id="bottom"
          showLabels
          >
            <BottomNavigationAction style={{color: 'white'}} onClick={() => window.location.href='/about'} label="About" icon={<ChatIcon />} />
            <BottomNavigationAction style={{color: 'white'}} onClick={() => window.location.href='/contact'} label="Contact Us" icon={<EmailIcon />} />
          </BottomNavigation>
    </div>


    );
  }
}

export default App;
