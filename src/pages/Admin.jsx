import React, { Component } from 'react'; 
import { data } from '../config'; 
import { QrDialogue } from '../component/index'; 


class Admin extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventid: '1', 
            participantid: '2', 
        }

        this.loadData = this.loadData.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.checkIn = this.checkIn.bind(this); 
        this.showQR = this.showQR.bind(this); 
        
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async() => {
        await this.getToken();
    }

    getToken = async() => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }

    checkIn = async () => {

        try {

            await fetch(data.host + ':' + data.port + data.path + '/get_checkin_token', {
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
                    this.showQR(json); 
                    return console.log(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    showQR = (json) => {

        try {

            this.setState({
                qr: JSON.stringify(json.interactionToken)
            })
            console.log('this state qr')
            console.log(this.state.qr)

        } catch (e) {
            console.log(e)
        }

        this.toggleShowDialogue();

    }

    toggleShowDialogue = () =>  {
        this.setState({
            showDialogue: !this.showDialogue,
        })
    }

    render() {

        return(
            <div className="standard">
                <h1>This is the admin area. </h1>
                <button onClick={this.checkIn}>
                    Check Participant in
                </button>

                {this.state.showDialogue && <QrDialogue qr={this.state.qr} closeQr={this.toggleShowDialogue}/>}

            </div>
            
        )
    }

}

export default Admin; 