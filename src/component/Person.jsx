import React, { Component } from 'react'; 
import {PersonOutlineOutlined, CheckBox, HelpOutline } from "@material-ui/icons"; 
import { Grid, styled } from '@material-ui/core';

const CheckBoxIcon = styled(CheckBox)({
    color: '#53d769', 
    height: 28, 
    padding: '0 30px'
}); 

const MaybeIcon = styled(HelpOutline)({
    color: '#ff974a', 
    height: 28, 
    padding: '0 30px'
}); 

const PersonIcon = styled(PersonOutlineOutlined)({
    color: 'white', 
    height: 28, 
    padding: '0 30px'
}); 

class Person extends Component {

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
                    <Grid item xs={1} className="person-grid-status"> 
                        { this.props.status === "yes" ? <CheckBoxIcon /> : <MaybeIcon />}
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Person; 