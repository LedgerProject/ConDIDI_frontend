import React, { Component } from 'react'; 
import Image from './Image'; 
import styled from 'styled-components';

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


class Event extends Component {

    render() {

        return(
            <div>
                <br />
                <br />
                <br />
                <Image
                    name="event-image"
                    width="635"
                    height="330"
                />

                <h2>{this.props.name}</h2>

                <Header>Event Description</Header>

                <Description>{this.props.type}</Description>
                <p>{this.props.date}</p>
            </div>
        )
    }

}

export default Event; 