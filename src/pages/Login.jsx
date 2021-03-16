import React, { Component } from 'react';
import styled from 'styled-components'; 
import blackChairs from '../media/images/blackChairs.jpg'; 
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'; 
import QRCode from "react-qr-code";  

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

`

const WhiteBox = styled.section`
    width: 1000px;
    position: absolute;
    margin: 20px -30px 20px 800px;
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

const Label = styled.p`
    font-size: 12px; 
    font-weight: bold; 
    color: #1e1f20; 
    height: 20px; 
    letter-spacing: 1px; 
    padding: 0.5em;   
`;

const GreenButton = styled(Button)`
    width: 350px;
    height: 58px;
    border-radius: 12px;
    background-color: #82c43c;
    color: #f7f7f7; 
    border-color: #82c43c;

    &:hover {
        color: #82c43c; 
        background-color: #f7f7f7; 
         
    }
`

const GreyButton = styled(Button)`
    width: 350px;
    height: 58px;
    border-radius: 12px;
    background-color: #1e1f20;
    color: #f7f7f7; 
    border-color: #1e1f20; 

    &:hover {
        color: #1e1f20; 
        background-color: #f7f7f7
        
    }
    
`

const TinyButton = styled(Button)`
    border-radius: 12px;
    background-color: #1e1f20;
    color: #f7f7f7; 

    &:hover {
        color: #1e1f20; 
        background-color: #f7f7f7; 
         
    }
`

const StyledTextField = styled(TextField)`
    background-color: #f7f7f7;
    
`

class Login extends Component {

    constructor(props) {
        super(props); 
        this.state={
            qrOpen: false, 
            QRText: "www.whereDoesThisGo?.com", 
            isLoggedIn: false, 
            signUpOpen: false, 
            
        }; 

        this.handleQrOpen = this.handleQrOpen.bind(this); 
        this.handleQrClose = this.handleQrClose.bind(this); 
        this.handleSignUpOpen = this.handleSignUpOpen.bind(this); 
        this.handleSignUpClose = this.handleSignUpClose.bind(this); 
        this.logIn = this.logIn.bind(this); 
        this.handleLogin = this.handleLogin.bind(this); 
    }

    handleQrOpen = () => { 
        this.setState({ qrOpen: true})
    }

    handleQrClose = () => { 
        this.setState({ qrOpen: false})
    }

    handleSignUpOpen = () => { 
        this.setState({ signUpOpen: true})
    }

    handleSignUpClose = () => { 
        this.setState({ signUpOpen: false})
    }

    handleLogin = (success) => {

        if( success === 'yes'){ 
            this.setState({
                isLoggedIn: true, 
            })
            console.log(this.state.isLoggedIn)
        } else {
            this.setState({
                isLoggedIn: false, 
            })
            console.log(this.state.isLoggedIn)
        }
    }
    
    logIn = async() => {

        const e = 'test@condidi.invalid'; 
        const pw = 'wrong'; 

        try {

            await fetch('http://localhost:8080/api/login_password', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: e, 
                    password: pw
                })
            })
            .then((response) => { 
                return response.json() 
            }) 
            .then((json) => { 
                this.handleLogin(json.success)
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    render(){
        return(

            <Wrapper>
                <StyledImage src={blackChairs}/> 
                <WhiteBox>
                    <Title>CNDD </Title>
                    <Headline> Welcome Back! </Headline>
                    <Text>
                        Sign in to continue or
                    </Text>
                    <TinyButton
                        onClick={this.handleSignUpOpen}
                    > 
                        Sign up here
                    </TinyButton>

                    <Label>Email</Label>

                    <StyledTextField 
                        id="emailInput" 
                        variant="outlined" 
                        defaultValue="anne.carry@mail.com"/> 

                    <Label>Password</Label>

                    <StyledTextField 
                        id="passwordInput" 
                        variant="outlined" 
                        type="password"
                        defaultValue="password"/> 

                    <Text>Forgot Password?</Text>

                    <GreenButton
                        onClick={this.logIn}
                    >
                        LogIn
                    </GreenButton>

                    <p className="connect-text">Or connect with SSI</p>

                    <GreyButton 
                        onClick={this.handleQrOpen}
                    > 
                        Connect with Jolocom
                    </GreyButton>

                    <Dialog
                        open={this.state.qrOpen}
                        onClose={this.handleQrClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="dialog-qr"
                    >
                        <DialogTitle id="alert-dialog-title">Scan QR Code</DialogTitle>

                        <DialogContent>

                            <DialogContentText id="alert-dialog-description" className="dialog-content-text">
                                Use your Jolocom Wallet to scan this QR Code and log into ConDIDi. 
                            </DialogContentText>

                            <QRCode className="qr-code" value={this.state.QRText}/>                            
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleQrClose} href='/settings'>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.signUpOpen}
                        onClose={this.handleSignUpClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="dialog-signup"
                    >
                        <DialogTitle id="alert-dialog-title">Sign up</DialogTitle>

                        <DialogContent>

                            <DialogContentText id="alert-dialog-description" className="dialog-content-text">
                                Please fill out this form to sign up
                            </DialogContentText>                         
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleSignUpClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </WhiteBox>
            </Wrapper>

        )
    }
}    

export default Login; 