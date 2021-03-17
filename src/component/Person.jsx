import React, { Component } from 'react'; 
import {PersonOutlineOutlined, HighlightOffOutlined, AddOutlined } from "@material-ui/icons"; 
import { Grid, IconButton, styled } from '@material-ui/core';
import { data } from '../config'; 

const RemoveIcon = styled(HighlightOffOutlined)({
    color: 'red', 
    height: 28, 
    padding: '0 30px'
});

const UpdateIcon = styled(AddOutlined)({
    color: 'white', 
    height: 28, 
    padding: '0 30px'
});

const PersonIcon = styled(PersonOutlineOutlined)({
    color: 'white', 
    height: 28, 
    padding: '0 30px'
}); 

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
                eventId: this.props.eventId, 
            })

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
                    eventid: this.state.eventid, 
                    participantid: this.state.participantid, 
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
            <div className="person">
                <Grid container className="person-grid">
                    <Grid item xs={1} className="person-grid-icon"> 
                        <PersonIcon /> 
                    </Grid>
                    <Grid item xs={4} className="person-grid-name"> 
                        {this.props.name} 
                    </Grid>
                    <Grid item xs={1} className="person-grid-delete"> 
                        <IconButton onClick={this.removePerson} >
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1} className="person-grid-update"> 
                        <IconButton>
                            <UpdateIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Person; 