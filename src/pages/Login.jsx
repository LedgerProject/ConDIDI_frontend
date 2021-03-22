import React, { Component } from 'react';
import styled from 'styled-components'; 
import blackChairs from '../media/images/blackChairs.jpg'; 
import {LogIn, SignUp} from '../component/index'; 
import { Grid, Switch } from '@material-ui/core'; 

const Wrapper = styled.section`
    width: 100%;
    heigth: 100%; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    margin: 0px -30px 0px 0px;
`; 

const StyledImage = styled.img`
    position: absolute; 
    margin: 0em; 
    padding: 0em; 
    width: 100%; 
    height: 100%; 
`; 

const WhiteBox = styled.section`
    width: 75%;
    position: absolute;
    margin: 20px 0px 0px 800px;
    padding: 2em;   
    background-color: #f7f7f7;
    border-radius: 25px;  
`;

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

const StyledSwitch = styled(Switch)`
    background-color: #f7f7f7; 
    color: #1e1f20; 

    &:checked {
        background-color: #1e1f20; 
    }
`; 

class Login extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            showLogin: true, 
            showSignup: false, 
            token: '', 
            isLoggedIn: false, 
        }; 
        this.setToken = this.setToken.bind(this); 
        this.toggle = this.toggle.bind(this); 
    }

    setToken(userToken) {
        this.setState({
            token: userToken, 
            isLoggedIn: true, 
        })
        this.passToken(); 
    }

    passToken() {
        this.props.setToken(this.state.token)
    }

    toggle() {
        this.setState({
            showLogin: !this.state.showLogin, 
            showSignup: !this.state.showSignup, 
        })
    }

    render(){
        return(

            <Wrapper>
                <StyledImage src={blackChairs}/> 
                <WhiteBox>
                    <Title>CNDD</Title>
                    <Headline>Welcome Back!</Headline>
                    <Text>Log in or sign up to continue.</Text>
                    <Grid container spacing={1}>
                        <Grid item>Login</Grid>
                        <Grid item>
                            <StyledSwitch 
                                checked={this.state.showSignup}
                                onChange={this.toggle}
                                color="default"
                            />
                        </Grid>
                        <Grid item>Sign up</Grid>
                    </Grid>
                    
                    {this.state.showLogin && 
                        <LogIn 
                            token={this.state.token} 
                            isLoggedIn={this.state.isLoggedIn}
                            setToken={this.setToken}
                        />
                    }
                    <br /> 
                    {this.state.showSignup &&
                        <SignUp /> 
                    }
                    <br/> 
                    
                </WhiteBox>
            </Wrapper>

        )
    }
}    

export default Login; 