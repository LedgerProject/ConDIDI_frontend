import React, { Component } from 'react'; 
import {PersonOutlineOutlined, HighlightOffOutlined, AddOutlined } from "@material-ui/icons"; 
import { Grid, IconButton } from '@material-ui/core';
import { data } from '../config'; 
import styled from 'styled-components'; 
 
const RemoveIcon = styled(HighlightOffOutlined)`
    color: red;  
    height: 28px; 
`
 
const UpdateIcon = styled(AddOutlined)`
    color: #ffffff; 
    height: 28px;  
`
 
 
const PersonIcon = styled(PersonOutlineOutlined)`
    color: #ffffff; 
    height: 28px; 
`
 
const StyledPerson = styled.section`
    color: #ffffff; 
    margin: 0px -30px 0px 10px; 
 
`
 
class Person extends Component {
 
    constructor(props) {
        super(props); 
 
        this.state = {
            personId: '', 
            eventId: '', 
            token: JSON.parse(localStorage.getItem('token')), 
            participantdict: '', 
        }
 
        this.removePerson = this.removePerson.bind(this); 
        this.updatePerson = this.updatePerson.bind(this); 
    }
 
    componentDidMount = () => {
        try {
            this.setState({
                personId: this.props.personId, 
                eventId: this.props.eventid, 
            })
            console.log("pid; "+this.state.personId)
        } catch (e) {
            console.log(e)
        }
    }
 
    removePerson = async () => {
 
        try {
 
            await fetch(data.host+':'+data.port+data.path+'/remove_participant', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                    eventid: this.state.eventId, 
                    participantid: this.state.personId, 
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }
        window.location.reload();
    }
 
    updatePerson = async () => {
 
        try {
 
            await fetch(data.host+':'+data.port+data.path+'/update_participant', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                    participantid: this.state.participantid, 
                    participantdict: this.state.participantdict, 
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }
 
    }
 
    render() {
 
        return(
            <StyledPerson>
                <Grid container >
                    <Grid item xs={1}> 
                        <PersonIcon /> 
                    </Grid>
                    <Grid item xs={4} > 
                        {this.props.name} 
                    </Grid>
                    <Grid item xs={1} > 
                        <IconButton onClick={this.removePerson} >
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} > 
                        <IconButton>
                            <UpdateIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </StyledPerson>
        )
    }
 
}
 
export default Person; 