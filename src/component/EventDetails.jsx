import React, { Component } from 'react'; 
import { data } from '../config';  
import styled from 'styled-components';
import Image from './Image'; 
import { CreateParticipant, Person } from './index'; 

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
            participantlist: [], 
        }
    }

    componentDidMount = async () => {
        await this.loadParticipants(); 
    }

    loadParticipants = async () => {
        try {
            this.setState({
                participantlist: await this.props.participantlist
            }); 
        } catch (e) {
            console.log(e); 
        }
    }

    render() {


        return(
            <ParticipantDetails>
                <h2>Address</h2>

                <Image width='340' height='240'/> 

                <h2>Participants</h2>

                <div> 
                    {this.props.participantslist.map((id) => 
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
    }
}

export default SingleEventDetails; 