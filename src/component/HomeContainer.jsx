import React, {Component } from "react"

import { withCookies, Cookies } from 'react-cookie'; 
import { instanceOf } from 'prop-types'; 
import NameForm from './NameForm'

class Home extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }; 

    constructor(props) {
        super(props); 

        const {cookies} = props; 
        this.state = {
            name: 'Ben'
        }
    }

    handleNameChange(name) {
        const { cookies } = this.props;
 
        cookies.set('name', name, { path: '/' });
        this.setState({ name });
    }

    render () {
        const { name } = this.state; 

        return (
            <div>
                <NameForm name={name} onChange={this.handleNameChange.bind(this)} /> 
                {this.state.name && <h1>Hello {this.state.name}!</h1>}
            </div>
        ); 
    }
    
 }

 export default Home;