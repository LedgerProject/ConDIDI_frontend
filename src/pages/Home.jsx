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

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
        }

        this.loadData = this.loadData.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.getToken();
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }



    render() {

        return (
            <Wrapper>
                <h2>Home</h2>
            </Wrapper>
        )
    }

}

export default Home;