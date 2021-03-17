import React, { Component } from 'react';
import { data } from '../config';  

class SignUp2 extends Component {

    constructor(props) {
        super(props); 

        this.state = {

            n: '', 
            e: '', 
            pw: '', 

        }

        this.handleSignup = this.handleSignup.bind(this); 
    }

    handleInputChange = (event) => {

        const target = event.target; 
        const name = target.name; 
        const value = target.value; 

        this.setState({
            [name]: value, 
        }); 
    } 

    handleSignup = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/create_user', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.n, 
                    email: this.state.e, 
                    password: this.state.pw
                })
            })
            .then((response) => { 
                return response.json() 
            }) 
            .then((json) => { 
                return console.log(JSON.stringify(json)); 
            });

        } catch (error) {
            console.log(error); 
        }

    }


    render(){
        return(

            <div>
                <h2>Sign up</h2>

                <form onSubmit={this.handleSignup}>
                    <label>
                        Name
                        <input 
                            type="text"
                            name="n"
                            onChange={this.handleInputChange}
                        /> 
                    </label>
                    <br /> 
                    <label>
                        Email
                        <input 
                            type="text"
                            name="e"
                            onChange={this.handleInputChange}
                        /> 
                    </label>
                    <br /> 
                    <label>
                        Password
                        <input 
                            type="password"
                            name="pw"
                            onChange={this.handleInputChange}
                        /> 
                    </label>
                    <br /> 
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }


}

export default SignUp2; 