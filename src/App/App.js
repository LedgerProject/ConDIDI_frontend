import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import { Calendar, Home, Login, Admin, EventPage, MyEvents, CreateEvent } from '../pages/index'; 
import { SideNavbar } from '../component/index'

import '../media/styles/Style.scss'



class App extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      isLoggedIn: false, 
      token: '',
    }

    this.init = this.init.bind(this); 
    this.getToken = this.getToken.bind(this);
    this.logout = this.logout.bind(this); 
    this.setToken = this.setToken.bind(this); 
  }

  componentDidMount = () => {
    this.init();
  }
 
  init = async () => {
    this.setState({
      token: await this.getToken()
    });
  }
 
  getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString); 
      return userToken; 
    } catch (e) {
      console.log(e); 
    }
    
  }

  setToken(userToken) {
    this.setState({
      token: userToken, 
      isLoggedIn: true, 
    }); 
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  logout() {
    this.setState({
      isLoggedIn: false, 
      token: '', 
    }); 
    localStorage.removeItem('token');
  }

  render() {

    if(!this.state.token) {
      return <Login setToken={this.setToken} /> 
    } else {
      return (
        <div className="app">
          <Router basename="/condidi">
            <SideNavbar 
              isLoggedIn={this.state.isLoggedIn} 
              token={this.state.token}
              logout={this.logout}
            /> 
            <Switch>
              <Route exact path="/"  
                render={() => 
                  <Home 
                    token={this.state.token}
                  />
                }
              />
              <Route exact path="/calendar"
                render={() => 
                  <Calendar 
                    token={this.state.token}
                  />
                }
              />
              <Route exact path="/admin" 
                render={() => 
                  <Admin 
                    token={this.state.token}
                  />
                }
              />
              <Route 
                exact 
                path="/calendar/event/:id" 
                location={this.props.location}
                key={this.props.key}
                render={(props) => 
                  <EventPage 
                    {...props}
                    token={this.state.token}
                  />
                }
              />
              <Route exact path="/admin/my_events" 
                render={() => 
                  <MyEvents 
                    token={this.state.token}
                  />
                }
              />
              <Route exact path="/admin/create_event" 
                render={() => 
                  <CreateEvent 
                    token={this.state.token}
                  />
                }
              />
            </Switch>
          </Router>
        </div>
      )
    }
  }
}

export default App;
