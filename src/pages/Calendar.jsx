import React, { Component } from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { SearchBar, LinkList, Event }  from '../component/index'; 
import Code from '../media/images/code.jpg'; 
import { events } from '../media/files/events'; 
import styled from 'styled-components'; 

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


    render() {

        return (
            <Wrapper> 

                <SearchBar /> 

                <Title>
                    Events
                </Title>

                <LinkList />             

                <GridList cellHeight={450} cols={3}>
                    {events.map((event) => {
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
                                        title={event.title}
                                        subheader={event.subheader}
                                    /> 
                                </GridListTile>
                            ); 
                        })
                    }
                </GridList>  

            </Wrapper>
        )
    }

}

export default Calendar; 