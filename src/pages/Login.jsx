import React, { Component } from 'react';
import styled from 'styled-components'; 
import blackChairs from '../media/images/blackChairs.jpg'; 
import {LogIn, SignUp} from '../component/index'; 

const Wrapper = styled.section`
    width: 100%;
    heigth: 100%; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    margin: 0px -30px 0px 0px;
`

const StyledImage = styled.img`
    position: absolute; 
    margin: 0em; 
    padding: 0em; 
    width: 1800px; 
    height: 1600px: 

`

const WhiteBox = styled.section`
    width: 1000px;
    position: absolute;
    margin: 20px -30px 20px 800px;
    padding: 2em;   
    background-color: #f7f7f7;
    border-radius: 25px;  
`;

class Login extends Component {

    constructor(props) {
        super(props); 
        this.state={
            showLogin: true, 
            showSignup: false, 
            token: '', 
            isLoggedIn: false
            
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
                    <button onClick={this.toggle}>
                        Toggle SignUp / LogIn
                    </button>
                </WhiteBox>
            </Wrapper>

        )
    }
}    

export default Login; 