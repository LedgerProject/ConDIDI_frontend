import React, { Component } from 'react';
import { data } from '../config';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const StyledHeadline = styled.h2`
    color: #1c1a1a;
`;

const FormWrapper = styled.section`
    text-align: left; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    padding: 2em; 
    color: #1c1a1a; 
`;

class CreateParticipant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: JSON.parse(localStorage.getItem('token')),
            name: '',
            email: '',
            did: '',
            paymentStatus: '',
            attendenceStatus: '',
            signupDate: '',
            ticketId: '',
            credentialId: '',
            ticketIssued: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.makeJson = this.makeJson.bind(this);
    }

    makeJson = () => {
        return ({

            "name": this.state.name,
            "email": this.state.email,
            "did": this.state.did,
            "payment status": this.state.paymentStatus,
            "attendence status": this.state.attendenceStatus,
            "signup date": this.state.signupDate,
            "ticket id": this.state.ticketId,
            "credential id": this.state.credentialId,
            "ticked issued": this.state.ticketIssued,
        })
    }

    sendData = async () => {

        const participantdict = this.makeJson();
        console.log(participantdict)
        try {

            await fetch(data.host + ':' + data.port + data.path + '/add_participant', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: JSON.parse(localStorage.getItem('token')),
                    participantdict: participantdict,
                    eventid: this.props.eventid
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
        window.location.reload();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    render() {

        return (
            <FormWrapper>
                <StyledHeadline>Add Participant</StyledHeadline>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Participant Name:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="name"
                            type="text"
                            onChange={this.handleChange} 
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Email:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            DiD
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="did"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Payment Status:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="paymentStatus"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Attendence Status:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="attendenceStatus"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Signup Date:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="signupDate"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Ticket ID:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="ticketId"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Credential ID:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="credentialId"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <label>
                            Ticket Issued:
                        </label>
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            name="ticketIssued"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={2}>

                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>

                </Grid>
            </FormWrapper>
        )
    }
}

export default CreateParticipant;