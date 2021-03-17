import React, { Component } from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { SearchBar, LinkList, Event2 }  from '../component/index'; 
import Code from '../media/images/code.jpg'; 
import { events } from '../media/files/events'; 
import styled from 'styled-components'; 
import { data } from '../config'; 
import { ThreeSixty } from '@material-ui/icons';

const Title = styled.h1`    
    padding: 2em; 
    font-family: Roboto;
    font-size: 30px;
    font-weight: bold;
    color: #1e1f20;
`;

const Wrapper = styled.section`
    width: 100%;
    padding: 4em; 
    background-color: #f7f7f7;
    border-radius: 25px; 
`

class Calendar extends Component {

    constructor(props) {
        super(props); 

        this.state = { 
            token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc', 
            eventlist: [], 
        }

        this.getEvents = this.getEvents.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.setEvents = this.setEvents.bind(this); 
    }

    componentDidMount() {
        this.getToken(); 
        this.getEvents(); 

    }
    getToken = async () => {
        this.setState({
            token: await this.props.token, 
        })
        console.log("This is calendar, here is my token: " + this.state.token)
    }


    getEvents = async() => {

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
                this.setEvents(json); 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }
    }

    setEvents = async (json) =>  {

        

        this.setState({
            eventlist: json.eventlist
        })

        console.log("Eventlist " + this.state.eventlist) 
        console.log("Eventlist " + this.state.eventlist[0]) 
        console.log("Eventlist " + this.state.eventlist[1]) 
        console.log("Eventlist " + this.state.eventlist[2]) 
        console.log('Event id: ' + this.state.eventlist[0].eventid)
        console.log('Event id type: ' + this.state.eventlist[0].eventid.type)

    }


    render() {

        return (
            <Wrapper> 
                <SearchBar /> 
                <Title>
                    Events
                </Title>
                <LinkList />  

                <GridList cellHeight={450} cols={3}>
                    {this.state.eventlist.map((event) => {
                        console.log(event)
                        return (
                            <GridListTile>
                                <Event2
                                    key={event.eventid}
                                    id={event.eventid}
                                    date={event.date}
                                    subject={event.subject}
                                    image={Code}
                                    title={event.name}
                                    subheader={event.type}
                                    token={this.state.token}
                                /> 
                            </GridListTile>
                        ); 
                    })}
                </GridList>       

                {/**     
                <GridList cellHeight={450} cols={3}>
                    {this.state.eventlist.map((event) => {
                            return (
                                <GridListTile>
                                    <Event
                                        key={event.eventID}
                                        eventID={event.eventID}
                                        image={Code}
                                        day={event.day}
                                        weekday={event.weekday}
                                        month={event.month}
                                        year={event.year}
                                        title={event.name}
                                        subheader={event.subheader}
                                    /> 
                                </GridListTile>
                            ); 
                        })
                    }
                </GridList>  
                */}
            </Wrapper>
        )
    }

}

export default Calendar; 