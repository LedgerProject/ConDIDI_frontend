import React, { Component } from 'react'; 
import {Button } from '@material-ui/core'; 
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import styled from 'styled-components'; 
import { data } from '../config';  


const StyledButton = styled(Button)`
    border-radius: 12px;
    background-color: #f7f7f7;
    color: #1e1f20; 
    margin: 2em; 
    padding-left: 20px; 
`


class Logout extends Component {

    constructor(props) {
        super(props); 

        this.state =  {
            isLoggedIn: true, 
            token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc', 
        }

        this.logout = this.logout.bind(this); 


    }

    componentDidMount() {
        this.setState({
            isLoggedIn: this.props.isLoggedIn, 
            token: this.props.token, 
        })
    }

    logout = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/logout', {
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
                return console.log(JSON.stringify(json)); 
            });

        } catch (error) {
            console.log(error); 
        }

        this.props.handleLogout(); 

        {/* 
            Needed later! If server does not respond, logout anyway. 
            
        setTimeout(() => {
            this.props.handleLogout(): 
        }, 3000)

        */}

        this.setState({
            isLoggedIn: false, 
        })

    } 

    render() {
      return(
        <StyledButton variant='contained' onClick={this.logout} startIcon={<PowerSettingsNewRoundedIcon/> }>
            Logout
        </StyledButton>
      )
    }
}

export default Logout; 