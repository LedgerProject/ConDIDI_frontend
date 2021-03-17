import React, { Component } from 'react'; 

import { AdminEvents, AdminParticipants} from '../component/index'; 
import { Button, ButtonGroup } from '@material-ui/core'; 


class Admin extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            showParticipants: false, 
            showEvents: true
        }

        this.showEvents = this.showEvents.bind(this)
        this.showParticipants = this.showParticipants.bind(this); 
    }

    showEvents = () => { 
        this.setState({ 
            showEvents: true, 
            showParticipants: false
        })
    }

    showParticipants = () => { 
        this.setState({ 
            showEvents: false, 
            showParticipants: true, 
        })
    }


    render() {

        return(
            <div className="standard">
                <h1>This is the admin area. </h1>
                <div className='slider'>
                    <ButtonGroup 
                        className='button-Group'
                        disableElevation
                        variant='outlined'
                    >
                        <Button className='button' onClick={this.showEvents}>Events</Button>
                        <Button className='button' onClick={this.showParticipants}>Participants</Button>
                        
                    </ButtonGroup>
                </div>
                {this.state.showEvents && <AdminEvents /> }
                {this.state.showParticipants && <AdminParticipants /> }
            </div>
            
        )
    }

}

export default Admin; 