import React, { Component } from 'react';
import { data } from '../config';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

const StyledHeadline = styled.h2`
    color: #1c1a1a;
`;

const Wrapper = styled.section`
    //height: 100%;
    width: 100%;
    //position: fixed;
    margin: 0px -30px 0px 0px;
    padding: 50px 0px 0px 0px;  
    text-align: center; 
    background-color: #ffffff;
    border-radius: 25px; 
`;

const FormWrapper = styled.section`
    text-align: left; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    margin-left: 50px; 
    padding: 2em; 
`;


const DarkButton = styled.button`
    padding: 2em; 
    color: #f7f7f7; 
    background-color: #1c1a1a; 
    border-radius: 25px;
    border-color: #1c1a1a; 

    &:hover {
        color: #1c1a1a; 
        background-color: #f7f7f7; 
        border-color: #f7f7f7 ; 
         
    }
`


class CreateEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            subject: '',
            eventName: '',
            presenter: '',
            type: '',
            venueInformation: '',
            address: '',
            url: '',
            organiserInstitution: '',
            contactPersonName: '',
            contactPersonEmail: '',
            submissionDeadline: '',
            registrationDeadline: '',
            date: '',
            organiserUserId: '',
            message: ''
        }

        this.loadData = this.loadData.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
        this.sendEventData = this.sendEventData.bind(this); 
        this.makeJson = this.makeJson.bind(this); 
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.getToken();
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }    

    checkInput = (json) => {
        let flag = true;
        Object.keys(json).forEach(function (property) {
            if (json[property] === "") {
                if (property !== "organiser user id") flag = false;
            }
        });
        return flag;
    }


    sendEventData = async() => {

        const eventDict = this.makeJson(); 
        if(this.checkInput(eventDict)) {
        try {
 
            await fetch(data.host + ':' + data.port + data.path + '/add_event', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: JSON.parse(localStorage.getItem('token')),
                    eventdict: eventDict,
                })
            })
                .then((response) => {
                    return response.json()
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
            this.setState({ message: 'Event submitted' })
        } else {
            this.setState({ message: 'Please fill in empty fields' })
        }
    }

    makeJson = () => {
        return ({

            "name": this.state.eventName,
            "type": this.state.type,
            "presenter": this.state.presenter,
            "subject": this.state.subject,
            "venue information": this.state.venueInformation,
            "address": this.state.address,
            "url": this.state.url,
            "organiser institution": this.state.organiserInstitution,
            "contact person name": this.state.contactPersonName,
            "contact person email": this.state.contactPersonEmail,
            "submission deadline": this.state.submissionDeadline,
            "registration deadline": this.state.registrationDeadline,
            "date": this.state.date,
            "organiser user id": this.state.organiserUserId
         })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
        this.setState({ message: '' })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendEventData();
    }

    render() {

        return (

            <Wrapper>
                <StyledHeadline>Create Event</StyledHeadline>
                <FormWrapper>
                    <form onSubmit={this.handleSubmit}>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Event Name:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="eventName"
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
                                    Subject:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="subject"
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
                                    Event Type:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="type"
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
                                    Presenter:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="presenter"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Venue Information:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="venueInformation"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Event Address:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="address"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Event URL:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="url"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Organiser Institution:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="organiserInstitution"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Contact Person Name:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="contactPersonName"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Contact Person Email:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="contactPersonEmail"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Submission Deadline:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="submissionDeadline"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Registration Deadline:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="registrationDeadline"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <label>
                                    Date:
                                </label>
                            </Grid>
                            <Grid item xs={3}>
                                <input
                                    name="date"
                                    type="text"
                                    onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>


                        <Grid container spacing={2}>

                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <DarkButton type="submit">Submit</DarkButton>
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>

                        </Grid>


                    </form>
                    {this.state.message}
                </FormWrapper>

            </Wrapper>

        )
    }
}

export default CreateEvent;