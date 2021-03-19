import React, { Component } from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { SearchBar, LinkList, EventCard }  from '../component/index'; 
import Code from '../media/images/code.jpg'; 
import styled from 'styled-components'; 
import { data } from '../config'; 

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
            token: JSON.parse(localStorage.getItem('token')), 
            eventlist: [], 
        }

        this.getEvents = this.getEvents.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.setEvents = this.setEvents.bind(this); 
        this.loadData = this.loadData.bind(this); 
    }

    componentDidMount() {
        this.loadData(); 
    }

    loadData = async() => {
        await this.getToken();
        await this.getEvents();
    }
    
    getToken = async () => {
        this.setState({
            token: await this.props.token, 
        })
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

    }

    filter = (keyword) => {
        const result = this.state.eventlist.filter(event => event.name.includes(keyword));
        this.setState({eventlist: result})
    }

    render() {

        return (
            <Wrapper> 
                <SearchBar filter={this.filter}/> 
                <Title>
                    Events
                </Title>
                <LinkList />  

                {this.state.eventlist && 
                    <GridList cellHeight={450} cols={3}>
                        {this.state.eventlist.map((event) => {
                            return (
                                <GridListTile>
                                    <EventCard
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
                }      
            </Wrapper>
        )
    }

}

export default Calendar; 