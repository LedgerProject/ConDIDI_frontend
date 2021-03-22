import React, { Component } from 'react';
import styled from 'styled-components'; 
import { Button, Grid } from '@material-ui/core'; 
import { data } from '../config'; 
import { QrDialogue } from './index';

const GreenButton = styled(Button)`
    border-radius: 12px;
    background-color: #82c43c;
    color: #f7f7f7; 

    &:hover {
        color: #82c43c; 
        background-color: #f7f7f7; 
         
    }
`

class LogIn extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            e: '', 
            pw: '', 
            interactionId: '', 
            qr: '', 
            showDialogue: false, 
        }

        this.handleLogin = this.handleLogin.bind(this); 
        this.handleLoginWallet = this.handleLoginWallet.bind(this);
        this.handleToken = this.handleToken.bind(this); 
        this.showQR = this.showQR.bind(this); 
        this.handleQR = this.handleQR.bind(this); 
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

        window.location.reload();

    }

    handleToken = (userToken) => {
        this.setState({
            token: userToken.token, 
        })
        this.props.setToken(this.state.token); 
    }

    handleLoginWallet = async() => {

        try {
            await fetch(data.host+':'+data.port+data.path+'/login_wallet', {
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
                this.handleQR(json); 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }
    }

    handleQR = (json) => {
        this.setState({
            qr: JSON.stringify(json.interactionToken), 
            token: JSON.stringify(json.token), 
        })
        this.toggleShowDialogue(); 
    }

    handleInputChange = (event) => {
        const target = event.target; 
        const name = target.name; 
        const value = target.value; 
 
        this.setState({
            [name]: value, 
        }); 
    } 

    showQR = (j) => {
        this.setState({
            qr: j
        })
        this.toggleShowDialogue();
    }

    toggleShowDialogue = () =>  {
        this.setState({
            showDialogue: !this.showDialogue,
        })
    }

    render(){
        return(

            <div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <label>
                            Email
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input 
                            type="text"
                            name="e"
                            onChange={this.handleInputChange}
                        /> 
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <label>
                            Password
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input 
                            type="password"
                            name="pw"
                            onChange={this.handleInputChange}
                        /> 
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                        <GreenButton onClick={this.handleLogin}> 
                            Log In
                        </GreenButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                        <Button onClick={this.handleLoginWallet}>
                            Log in with Wallet
                        </Button>
                    </Grid>
                </Grid>
                {this.state.showDialogue && <QrDialogue qr={this.state.qr} closeQr={this.toggleShowDialogue}/>}
            </div>
        )
    }

}

export default LogIn; 