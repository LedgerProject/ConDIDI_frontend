import React, { Component } from 'react';
import { data } from '../config';
import { QrDialogue } from './index';
import { Button } from '@material-ui/core';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {

            n: '',
            e: '',
            pw: '',
            qr: '',
            showDialogue: false,

        }

        this.handleSignup = this.handleSignup.bind(this);
        this.handleCreateWallet = this.handleCreateWallet.bind(this);
        this.handleQRCode = this.handleQRCode.bind(this);
    }

    handleSignup = async () => {

        try {

            await fetch(data.host + ':' + data.port + data.path + '/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    return console.log(json);
                });

        } catch (error) {
            console.log(error);
        }

    }

    handleCreateWallet = async () => {
        await fetch(data.host + ':' + data.port + data.path + '/create_wallet_user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.n,
                email: this.state.e,
            })
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((json) => {
                this.handleQRCode(json);
                return console.log(json);
            });
    }

    handleQRCode = async (json) => {

        try {

            this.setState({
                qr: JSON.stringify(json.interactionToken)
            })
            console.log('this state qr')
            console.log(this.state.qr)

        } catch (e) {
            console.log(e)
        }

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

    toggleShowDialogue = () =>  {
        this.setState({
            showDialogue: !this.showDialogue,
        })
    }


    render() {
        return (

            <div>
                <h2>Sign up</h2>
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

                <Button onClick={this.handleSignup}>
                    SignUp
                </Button>

                <br />
                <br />
                <h2>Create Wallet</h2>
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
                <Button onClick={this.handleCreateWallet}>
                    Create Wallet
                </Button>


                {this.state.showDialogue && <QrDialogue qr={this.state.qr} closeQr={this.toggleShowDialogue}/>}
            </div>
        )
    }


}

export default SignUp;