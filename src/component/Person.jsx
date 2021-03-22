import React, { Component } from 'react'; 
import {PersonOutlineOutlined, HighlightOffOutlined, CheckOutlined, SubtitlesOutlined } from "@material-ui/icons"; 
import { Grid, IconButton } from '@material-ui/core';
import { data } from '../config'; 
import styled from 'styled-components'; 
import { QrDialogue } from '../component/index'; 
 
const RemoveIcon = styled(HighlightOffOutlined)`
    color: red;  
`
 
const UpdateIcon = styled(CheckOutlined)`
    color: #ffffff; 
`
 
const PersonIcon = styled(PersonOutlineOutlined)`
    color: #ffffff; 
`
 
const StyledPerson = styled.section`
    color: #ffffff; 
    margin: 0px -30px 0px 10px; 
 
`

const TicketIcon = styled(SubtitlesOutlined)`
    color: #ffffff; 
`
 
class Person extends Component {
 
    constructor(props) {
        super(props); 
 
        this.state = {
            personId: '', 
            eventId: '', 
            token: '', 
            qr: '', 
            showDialogue: false, 
        }
 
        this.removePerson = this.removePerson.bind(this); 
        this.checkInPerson = this.checkInPerson.bind(this); 
        this.sendTicket = this.sendTicket.bind(this); 
    }
 
    componentDidMount = () => {
        this.loadData(); 
    }

    loadData = async () => {
        await this.getToken(); 
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
            eventId: window.location.pathname.slice(24),
            personId: await this.props.personId, 
        })
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

    checkInPerson = async () => {

        try {

            await fetch(data.host + ':' + data.port + data.path + '/get_checkin_token', {
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
                    console.log('inside checkin person')
                    console.log(json)
                    this.showQR(JSON.stringify(json.interactionToken)); 
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    sendTicket = async () => {

        console.log('inside send ticket')
        console.log(this.state.token)
        console.log(this.state.eventId)
        console.log(this.state.personId)

        try {

            await fetch(data.host + ':' + data.port + data.path + '/issue_ticket', {
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
                    console.log('inside issue ticket')
                    console.log(json)
                    this.showQR(JSON.stringify(json.interactionToken)); 
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    showQR = (j) => {

        console.log('inside ShowQR')
        console.log(j)

        this.setState({
            qr: j
        })

        this.toggleShowDialogue();

    }

    toggleShowDialogue = () =>  {
        this.setState({
            showDialogue: !this.showDialogue,
        })
    }

 
    render() {
 
        return(
            <StyledPerson>
                <Grid container >
                    <Grid item xs={1}> 
                        <PersonIcon /> 
                    </Grid>
                    <Grid item xs={3} > 
                        {this.props.name} 
                    </Grid>
                    <Grid item xs={1} > 
                        <IconButton onClick={this.removePerson} >
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} > 
                        <IconButton onClick={this.sendTicket}>
                            <TicketIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} > 
                        <IconButton onClick={this.checkInPerson}>
                            <UpdateIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                {this.state.showDialogue && <QrDialogue qr={this.state.qr} closeQr={this.toggleShowDialogue}/>}
            </StyledPerson>
        )
    }
 
}
 
export default Person; 