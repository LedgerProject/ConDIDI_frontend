import React, { Component } from 'react';
import { data } from '../config';  

class SignUp2 extends Component {

    constructor(props) {
        super(props); 

        this.handleSignup = this.handleSignup.bind(this); 
    }

    handleSignup = async() => {

        const n = 'testuser'; 
        const e = 'test@condidi.invalid'; 
        const pw = '12345'; 

        try {

            await fetch(data.host+':'+data.port+data.path+'/create_user', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: n, 
                    email: e, 
                    password: pw
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
                    <input type="text"/> 
                </label>
                <br /> 
                <label>
                    Email
                    <input type="text"/> 
                </label>
                <br /> 
                <label>
                    Password
                    <input type="password"/> 
                </label>
                <br /> 
                <input type="submit" value="submit"/>
            </form>
            </div>
        )
    }


}

export default SignUp2; 