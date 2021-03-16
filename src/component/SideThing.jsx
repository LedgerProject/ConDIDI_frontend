import React, { Component } from 'react'; 
import { Button } from '@material-ui/core';

import Image from '../component/Image'; 

import { Person } from '../component/index'; 
import { singleEventParticipants } from '../media/files/singleEventParticipants'; 


class SideThing extends Component {

    render() {


        return(
            <div className="side-thing">
                <h2>Address</h2>

                <Image className="side-thing-element" width='340' height='240'/> 


                <h2>Participants</h2>

                {singleEventParticipants.map((id) => 
                    <Person name={id.personName} status={id.status} /> 
                )}

                <Button className="side-thing-element">
                    Submit application
                </Button>

            </div>
        )
    }

}

export default SideThing; 