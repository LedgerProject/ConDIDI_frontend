import React, { Component } from 'react'; 
import { data } from '../config'; 
import { Grid, Button } from "@material-ui/core"
import { Person } from '../component/index'; 
import Image from '../component/Image'; 
import { singleEventParticipants } from '../media/files/singleEventParticipants'; 
import styled from 'styled-components'; 

const EventPage = styled.section`
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

const StyledButton = styled(Button)`
    width: 100px; 
    height: 60px;
    background-color: #ffffff;
    color: #8f92a1;  
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



class SingleEventPage extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventlist: [], 
            pageid: '', 
            name: '', 
            subject: '', 

        }

        this.getEventData = this.getEventData.bind(this); 
        this.getParticipantData = this.getParticipantData.bind(this); 
        this.setStateData = this.setStateData.bind(this); 
        this.setEventName = this.setEventName.bind(this); 
        this.setEventSubject = this.setEventSubject.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.loadData = this.loadData.bind(this); 
        this.addParticipant = this.addParticipant.bind(this); 
    }

    componentDidMount() {
        this.loadData(); 
    }

    loadData = async() => {
        await this.getToken();
        await this.getEventData();
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),  
            id: this.props.match.params.id, 
        })
    }

    getParticipantData = async (eID) => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/list_participants', {
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
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }

    }

    getEventData = async () => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/list_my_events', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                this.setStateData(json); 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }

    }

    setStateData = async (json) =>  {

        try {
            this.setState({
                eventlist: await json.eventlist,  
                pageid: window.location.pathname.slice(7), 
                name: this.state.event
            })
            this.setEventName(json.eventlist[this.state.pageid].name); 
            this.setEventSubject(json.eventlist[this.state.pageid].subject); 

        } catch (error) {
            console.log(error)
        }
        
    }

    setEventSubject = (eventSubject) => {
        try {
            this.setState({
                subject: eventSubject, 
            }) 
        } catch (e) {
            console.log(e)
        }
        
    }

    setEventName = (eventName) => {

        try {
            this.setState({
                name: eventName, 
            }); 
        } catch (e) {
            console.log(e); 
        }
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

        return(

            <EventPage>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <div className="single-event-page">
                            <Image 
                                name="event-image" 
                                width="635" 
                                height="330"
                            /> 

                            <h2>{this.state.name}</h2>

                            <Header>Event Description</Header>

                            <Description>{this.state.subject}</Description>

                        </div> 
                    </Grid>
                    <Grid item xs>
                        <ParticipantDetails>
                            <h2>Address</h2>

                            <Image className="participant-details-element" width='340' height='240'/> 


                            <h2>Participants</h2>

                            {singleEventParticipants.map((id) => 
                                <Person name={id.personName} personId={'1'} eventid={'1'} /> 
                            )}

                            <form onSubmit={this.addParticipant}>
                                <label>
                                    <input type="text" name="name" onChange={this.handleChange}/>
                                </label>
                                <StyledButton type="submit">
                                    Add Participant
                                </StyledButton>
                            </form>

                        </ParticipantDetails>
                    </Grid>
                </Grid>
            </EventPage>           
        )
    }

}

export default SingleEventPage; 