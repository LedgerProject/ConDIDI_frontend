import React, { Component } from 'react';
import { data } from '../config';
import { Grid } from "@material-ui/core"
import { CreateParticipant, Person, Event, EventDetails } from '../component/index';
import Image from '../component/Image';
import styled from 'styled-components';

const StyledEventPage = styled.section`
    width: 100%; 
    background-color: #ffffff; 
    color: #1c1a1a; 
    margin: 0px -30px 0px 0px;
    padding: 40px 0px 0px 75px; 
    border-radius: 25px;
`

const ParticipantDetails = styled.section`
    background-color: #1c1a1a; 
    color: #ffffff; 
    margin: 50px 0px -30px 0px; 
    padding: 60px 0px 0px 70px;
    border-radius: 25px;
    width: 100%;
    height: 100%;
`

const Header = styled.h1`
    font-size: 16px; 
    font-weight: bold;
    color: #1c1a1a
`

const Description = styled.p`
    word-wrap: break-word; 
    //max-width: 635px; 
    color: #8f92a1
`



class EventPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            eventlist: [],
            pageid: '',
            name: '',
            subject: '',
            participantslist: [], 

        }

        this.getEventData = this.getEventData.bind(this); 
        this.getParticipantData = this.getParticipantData.bind(this); 
        this.setStateDataEvent = this.setStateDataEvent.bind(this); 
        this.setStateDataParticipant = this.setStateDataParticipant.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.loadData = this.loadData.bind(this); 
        this.addParticipant = this.addParticipant.bind(this); 
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.getToken();
        await this.getEventData();
        await this.getParticipantData(this.state.pageid); 
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
            pageid: window.location.pathname.slice(24),
        })
    }

    getEventData = async () => {

        try {

            await fetch(data.host + ':' + data.port + data.path + '/get_event', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    eventid: this.state.pageid, 
                })
            })
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    console.log('this werked')
                    this.setStateDataEvent(json);
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    setStateDataEvent = async (json) => {

        try {
            this.setState({
                eventdict: await json.eventdict,
                name: await json.eventdict.name, 
                eventid: await json.eventdict.eventid, 
                eventtype: await json.eventdict.type, 
                date: await json.eventdict.date, 
            })
        } catch (error) {
            console.log(error)
        }

    }

    getParticipantData = async (eID) => {

        try {

            await fetch(data.host + ':' + data.port + data.path + '/list_participants', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    eventid: eID,
                })
            })
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    this.setStateDataParticipant(json); 
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    setStateDataParticipant = async (json) =>  {

        this.setState({
            participantslist: await json.participants
        })
        
    }

    addParticipant = async () => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/add_participant', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                    participantdict: this.state.name, 
                    eventid: this.state.pageid, 
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

    handleChange = (event) => {
        this.setState({
            name: event.target.name, 
        })
    }

    render() {
        return (

            <StyledEventPage>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Event 
                            name={this.state.name} 
                            type={this.state.type}
                            date={this.state.date}
                        /> 
                    </Grid>
                    <Grid item xs>
                       {/* 
                        <EventDetails 
                            participantlist={this.state.participantslist}
                            pageid={this.state.pageid}
                        />
                        */}
                       
                    </Grid>

                </Grid>
            </StyledEventPage>
        )
    }

}

export default EventPage;