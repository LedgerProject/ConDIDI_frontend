import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import { Calendar, Home, Login, Admin, SingleEventPage, MyEvents, CreateEvent } from '../pages/index'; 
import { NewComponent, SideNavbar } from '../component/index'

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
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log("token: " + userToken?.token);
    return userToken?.token
  }

  setToken(userToken) {
    this.setState({
      token: userToken, 
      isLoggedIn: true, 
    })
    console.log("This is app.js and this is my token state: " + this.state.token); 
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }

  logout() {
    this.setState({
      isLoggedIn: false, 
      token: '', 
    })
  }

  render() {

    const token = this.getToken(); 

    console.log("token? : " + token); 

    if(!this.state.isLoggedIn) {
      return <Login setToken={this.setToken} /> 
    } else {
      return (
        <div className="app">
          <Router>
            <SideNavbar isLoggedIn={this.state.isLoggedIn} token={this.state.token}/> 
            <Switch>
              <Route path="/" exact 
                render={() => 
                  <Login 
                    setToken={this.setToken}
                  />
                }
              />
              <Route path="/home" exact component={Home} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/event/:id" component={SingleEventPage} />
              <Route path="/admin/my_events" component={MyEvents} />
              <Route path="/admin/create_event" component={CreateEvent} />
              <Route path="/playground" component={NewComponent} /> 
            </Switch>
          </Router>
        </div>
      )
    }
  }
}

export default App;
