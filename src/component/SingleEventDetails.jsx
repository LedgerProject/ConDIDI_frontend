import React, { Component } from 'react'; 
import { Button } from '@material-ui/core';
import { data } from '../config';  

import Image from './Image'; 

import { Person } from './index'; 


class SingleEventDetails extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventid: '', 
            participants: [], 
        }

        this.getToken = this.getToken.bind(this); 
        this.getParticipants = this.getParticipants.bind(this); 
        this.setParticipants = this.setParticipants.bind(this); 

    }

    componentDidMount = async () => {
        this.getToken(); 
        this.getParticipants(); 
        this.getEventId(); 
    }

    getEventId = async() => {
        this.setState({
            eventid: await this.props.eventid
        })
    }

    getToken = async() => {
        this.setState({
            token: await this.props.token, 
        })
    }

    getParticipants = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/list_participants', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                    eventid: this.state.eventid, 
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                this.singleEventParticipants(json); 
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    setParticipants(json)  {
        this.setState({
            participants: this.json.participants, 
        })
    }

    render() {


        return(
            <div className="side-thing">
                <h2>Address</h2>

                <Image className="side-thing-element" width='340' height='240'/> 


                <h2>Participants</h2>

                {this.state.participants.map((id) => 
                    <Person name={id.personName} /> 
                )}

                <Button className="side-thing-element">
                    Add Participant
                </Button>

            </div>
        )
    }

}

export default SingleEventDetails; 