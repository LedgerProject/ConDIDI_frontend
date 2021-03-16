import React, { Component } from 'react';
import { Columns } from '../media/files/EventsTable'; 
import DataTable from 'react-data-table-component'; 
import styled from 'styled-components'; 
import { data } from '../config'; 

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


class MyEvents extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            success: 'no', 
            columns: Columns, 
            rows: [], 
            rowsLength: '', 
            token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc'
        }

        this.getEvents = this.getEvents.bind(this); 
        this.makeRows = this.makeRows.bind(this); 
    }

    componentDidMount() {
        this.getEvents(); 
    }

    getEvents = async() => {

        try {

            await fetch(data.host+':'+data.port+data.path+'/list_my_events', {
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

                json.eventlist.forEach ( (obj) => {obj.id = obj.eventid})

                this.makeRows(json.eventlist); 
                
                return console.log(json.eventlist); 
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
                    <h2>My events</h2>
                    <StyledTable 
                        title="My Events"
                        columns={this.state.columns}
                        data={this.state.rows}
                        conditionalCellStyles={conditionalRowStyles}
                        Clicked
                        pagination
                        Selected={handleChange}
                    /> 

                </TableWrapper>
            </Wrapper>
        )
    }
}    

export default MyEvents; 