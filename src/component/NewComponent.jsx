import React, { Component } from 'react';
import styled from 'styled-components'; 
import { data } from '../config';  

const Wrapper = styled.section`
    width: 50%;
    heigth: 100%; 
    border-radius: 25px; 
    padding-left: 2em; 
`;


class NewComponent extends Component {

    constructor(props) {
        super(props); 
        this.state={
            name: '',
            email: '', 
            password: '', 
            success: '', 
            token: '', 
        }; 

        this.handleLogIn = this.handleLogIn.bind(this); 
        this.handleSignUp = this.handleSignUp.bind(this); 

    }

    handleLogIn = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/login_password', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email, 
                    password: this.state.password,                       
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    handleSignUp = async() => {

        console.log('This is signup! ')

        try {

            await fetch(data.host+':'+data.port+data.path+'/create_user', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name, 
                    email: this.state.email, 
                    password: this.state.password,                       
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    handleSubmit(event) {

        event.preventDefault(); 
        console.log('Name: ' + event.target.name); 
         

        this.setState({
            name: event.target.name, 
            email: event.target.email, 
            password: event.target.password, 

        })

        console.log('Name in state: ' + this.state.name);

        

    }


    render(){
        return(

            <Wrapper className="standard">

                <h2> Sign Up </h2>

                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" /> 

                    <label>Email</label>
                    <input type="text" name="email" /> 

                    <label>Password</label>
                    <input type="password" name="password" />     
                    <input type="submit" value="Submit" />  
                </form>

                <h2> Log In </h2>

                <form onSubmit={this.handleLogIn}>
                    <label>Email</label>
                    <input type="text" name="email" /> 

                    <label>Password</label>
                    <input type="password" name="password" /> 

                    <input type="submit" value="Submit" />  
                </form>
                
            </Wrapper>

        )
    }
}    

export default NewComponent; 