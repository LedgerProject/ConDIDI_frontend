import React, { Component } from 'react';
import { data } from '../config';
import { Grid } from "@material-ui/core"
import { Event, EventDetails } from '../component/index';
import styled from 'styled-components';

const StyledEventPage = styled.section`
    width: 100%; 
    background-color: #ffffff; 
    color: #1c1a1a; 
    margin: 0px -30px 0px 0px;
    padding: 40px 0px 0px 75px; 
    border-radius: 25px;
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
        this.setStateDataEvent = this.setStateDataEvent.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.loadData = this.loadData.bind(this); 
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.getToken();
        await this.getEventData();
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
                    this.setStateDataEvent(json);
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    setStateDataEvent = async (json) => {

        this.setState({
            eventdict: await json.eventdict,
            name: await json.eventdict.name, 
            eventid: await json.eventdict.eventid, 
            eventtype: await json.eventdict.type, 
            date: await json.eventdict.date, 
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
                        <EventDetails 
                            pageid={this.state.pageid}
                            token={this.state.token}
                        />                     
                    </Grid>

                </Grid>
            </StyledEventPage>
        )
    }

}

export default EventPage;