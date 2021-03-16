import React, { Component } from 'react'; 
import { Button } from '@material-ui/core';
import { data } from '../config';  

import Image from './Image'; 

import { Person } from './index'; 
import { singleEventParticipants } from '../media/files/singleEventParticipants'; 


class SingleEventDetails extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc', 
            eventid: '27', 
            participants: [], 
        }

        this.getParticipants = this.getParticipants.bind(this); 


    }

    componentDidMount() {
        console.log('Component did mount')
        this.getParticipants(); 
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
                console.log(response); 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json.participants); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    render() {


        return(
            <div className="side-thing">
                <h2>Address</h2>

                <Image className="side-thing-element" width='340' height='240'/> 


                <h2>Participants</h2>

                {this.state.participants.map((id) => 
                    //The following potentially needs to change based on the participant list.  
                    <Person name={id.personName} status={id.status} /> 
                )}

                <Button className="side-thing-element">
                    Submit application
                </Button>

            </div>
        )
    }

}

export default SingleEventDetails; 