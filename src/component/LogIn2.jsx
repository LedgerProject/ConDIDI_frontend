import React, { Component } from 'react';
import styled from 'styled-components'; 
import { Button } from '@material-ui/core'; 
import { data } from '../config'; 

const Title = styled.h1`
    color: $black;
    font-size: 50px; 
`;

const Headline = styled.p`
    font-size: 22px;
    font-weight: bold;
    color: #1e1f20;
    height: 30px;
    margin: 0 0 10px;
`;

const Text = styled.p`
    font-size: 14px; 
    font-weight: 500; 
    color: #494747;  
    height: 20px;    
`;

const GreenButton = styled(Button)`
    width: 350px;
    height: 58px;
    border-radius: 12px;
    background-color: #82c43c;
    color: #f7f7f7; 

    &:hover {
        color: #82c43c; 
        background-color: #f7f7f7; 
         
    }
`

class LogIn2 extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            e: 'test@condidi.invalid', 
            pw: '12345', 
        }

        this.handleLogin = this.handleLogin.bind(this); 
        this.handleToken = this.handleToken.bind(this); 
    }

    handleLogin = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/login_password', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.e, 
                    password: this.state.pw, 
                })
            })
            .then((response) => { 
                return response.json() 
            }) 
            .then((json) => { 
                this.handleToken(json)
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    handleToken(userToken) {

        this.setState({
            token: userToken.token, 
        })
        this.props.setToken(this.state.token); 
    }

    render(){
        return(

            <div>
                <Title>CNDD </Title>
                <Headline> Welcome Back! </Headline>
                <Text>
                    Sign in to continue or
                </Text>
                <GreenButton onClick={this.handleLogin}> 
                    Log In here
                </GreenButton>
            </div>
        )
    }

}

export default LogIn2; 