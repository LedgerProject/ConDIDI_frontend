import React, { Component } from 'react';
import { Columns } from '../media/files/ParticipantsTable'; 
import DataTable from 'react-data-table-component'; 
import styled from 'styled-components'; 
import { data } from '../config'; 
import { CreateParticipant } from './index'; 

const StyledTable = styled(DataTable)`
    height: 60%;
    margin: 0px 60px 0px 30px;
    padding: 10px 10px 10px 10px;
    
`

const Wrapper = styled.section`
    width: 90%;
    height: 100%;
    position: relative;
    background-color: #f7f7f7;
    border-radius: 25px; 
    margin: 0px -30px 0px 0px;
    padding-left: 2em; 
`;

const TableWrapper = styled.section`
    width: 85%;  
    position: relative;
    background-color: #f7f7f7;
    border-radius: 25px; 
    padding: 2em; 
`;

const conditionalRowStyles = [
    {
        when: row => row.type = 'Meetup', 
        style: {
            backgroundColor: 'green', 
            color: 'white', 
            '&:hover': {
                cursor: 'pointer'
            }, 
        }, 
    }, 
    {
        when: row => row.type = 'Festival', 
        style: {
            backgroundColor: 'yellow', 
            color: 'white', 
        }, 
    }, 
]; 

const handleChange  = (state) => {
    console.log('Selected rows: ', state.selectedRows)
}


class ParticipantList extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            success: 'no', 
            columns: Columns, 
            rows: [], 
            rowsLength: '', 
            token: ''
        }

        this.getParticipants = this.getParticipants.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.makeRows = this.makeRows.bind(this); 
        this.loadData = this.loadData.bind(this); 
    }

    componentDidMount() {
        this.loadData(); 
    }

    loadData = async() => {
        await this.getToken();
        await this.getParticipants();
    }

    getToken = async() =>  {

        this.setState({
            token: JSON.parse(localStorage.getItem('token')), 
        })
    }

    getParticipants = async() => {
        console.log("id: "+this.props.eventid)
        try {

            await fetch(data.host+':'+data.port+data.path+'/list_participants', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    eventid: this.props.eventid 
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                console.log(json)
                json.participants.forEach( (obj) => {obj.id = obj.eventid})

                this.makeRows(json.participants); 
                
                return console.log(json.participants); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    makeRows = (json) => {

        var arr = []; 
        Object.keys(json).forEach(function(key) {
            arr.push(json[key]); 
        }); 
        this.setState({
            rows: arr
        })
    }

    


    render(){
        return(

            <Wrapper>
                <TableWrapper>
                    <CreateParticipant eventid={this.props.eventid }/>
                    <StyledTable 
                        title="Add Participants to Event"
                        columns={this.state.columns}
                        data={this.state.rows}
                        pagination
                        Selected={this.handleChange}
                    /> 

                </TableWrapper>
            </Wrapper>
        )
    }
}    

export default ParticipantList; 