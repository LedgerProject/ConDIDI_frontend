import React, { Component } from 'react'; 
import styled from 'styled-components';
import Image from './Image'; 
import { CreateParticipant, Person } from './index'; 
import { data } from '../config';

const ParticipantDetails = styled.section`
    background-color: #1c1a1a; 
    color: #ffffff; 
    margin: 50px 0px -30px 0px; 
    padding: 60px 0px 0px 70px;
    border-radius: 25px;
    width: 100%;
    height: 100%;
`

class SingleEventDetails extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            participantslist: [], 
            token: '', 
            eventId: '', 
            loaded: false, 
        }

        this.loadData = this.loadData.bind(this); 
        this.loadParticipants = this.loadParticipants.bind(this); 
        this.setStateDataParticipant = this.setStateDataParticipant.bind(this); 

    }

    componentDidMount = () => {
        this.loadData(); 
    }

    loadData = async () => {
        await this.getToken(); 
        await this.loadParticipants(); 
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
            eventId: window.location.pathname.slice(24),
        })
    }

    loadParticipants = async () => {

        try {
            await fetch(data.host + ':' + data.port + data.path + '/list_participants', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    eventid: this.state.eventId,
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

    setStateDataParticipant = (json) =>  {
        this.setState({
            participantslist: json.participants, 
            loaded: true, 
        })
    }

    render() {

        if(this.state.loaded) {
            return (
                <ParticipantDetails>
                <h2>Address</h2>

                <Image width='340' height='240'/> 

                <h2>Participants</h2>

                <div> 
                    {this.state.participantslist.map((id) => 
                        <Person 
                            name={id.name} 
                            personId={id.participantid} 
                            eventid={this.props.pageid}  
                        /> 
                    )}
                    
                    <CreateParticipant 
                        eventid={this.props.pageid}
                    /> 
                </div>
            </ParticipantDetails>
            )
        } else {
            return(
                <ParticipantDetails>
                    <h2>Address</h2>
    
                    <Image width='340' height='240'/> 
    
                    <h2>Participants</h2>
                </ParticipantDetails>
            )

        }

        
    }
}

export default SingleEventDetails; 