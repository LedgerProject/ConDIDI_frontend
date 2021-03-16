import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import { withCookies } from 'react-cookie'; 

import { Calendar, Home, Login, Admin, SingleEventPage, MyEvents, CreateEvent } from '../pages/index'; 
import { SideNavbar } from '../component/index'

//import Home from '../component/HomeContainer'

import '../media/styles/Style.scss'

class App extends Component {
  
  render() {
    return (
      <div className="app">

        {/*<Home /> */}

        <Router>
          <SideNavbar /> 
          <Switch>
            <Route path="/" exact component={Login} />
            {/*<Route path="/home" render={() => (<Home cookies={this.props.cookies}/>)}/>*/}
            <Route path="/home" exact component={Home} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/event/:id" component={SingleEventPage} />
            <Route path="/admin/my_events" component={MyEvents} />
            <Route path="/admin/create_event" component={CreateEvent} />
          </Switch>
        </Router>
        
        
      </div>
    )
  }
}

export default withCookies(App);
