import React, { Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
    width: 100%;
    padding: 4em; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    overflow-x: scroll; 
    text-align: left; 
`

class Impressum extends Component {

    render() {
        return (
            <Wrapper>
                <h2>Impressum</h2>
                <a href='https://labs.tib.eu/info/projekt/condidi/'> Projekt Webseite </a>
            </Wrapper>
        )
    }
}

export default Impressum; 