import React, { Component } from 'react'; 
import { DataGrid } from '@material-ui/data-grid'; 
import { data } from '../config';  

import { Rows, Columns } from '../media/files/ParticipantsTable'; 

class AdminParticipants extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            rows: Rows, 
            columns: Columns, 
            token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc', 
            participantdict: [], 
            eventid: '27', 
            participantid: ''
        }

        this.addParticipant = this.addParticipant.bind(this); 
        this.removeParticipant = this.removeParticipant.bind(this); 
    }

    addParticipant = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/add_participant', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token, 
                    eventid: this.state.eventid, 
                    participantdict: this.state.participantdict, 
                })
            })
            .then((response) => { 
                console.log(response); 
                return response.json() 
            })
            .then((json) => { 
                return console.log(JSON.stringify(json)); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    removeParticipant = async() => {

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
                console.log(response); 
                return response.json() 
            })
            .then((json) => { 
                return console.log(JSON.stringify(json)); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    

    render() {

        return(
            <div className="admin">
                <h2>Admin Participants</h2>
                <div className='table'>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />
                </div>

                <button onClick={this.addParticipant}>
                    Add Participant
                </button>

                <button onClick={this.removeParticipant}>
                    Remove Participant
                </button>

            </div>
        )
    }

}

export default AdminParticipants; 