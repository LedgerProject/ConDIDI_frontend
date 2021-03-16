import React, { Component } from 'react';
import { Columns } from '../media/files/EventsTable'; 
import { DataGrid } from '@material-ui/data-grid'; 

class MyEvents extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            success: 'no', 
            columns: Columns, 
            rows: [], 
            rowsLength: '', 
        }

        this.getEvents = this.getEvents.bind(this); 
        this.makeRows = this.makeRows.bind(this); 
    }

    componentDidMount() {
        this.getEvents(); 
    }

    getEvents = async() => {

        try {

            await fetch('http://localhost:8080/api/list_my_events', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: 'Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc', 
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
        console.log(arr)
        this.setState({
            rows: arr
        })
    }

    


    render(){
        return(

            <div className="standard">

                <h2> My Events: </h2>
                <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={30} checkboxSelection />

            </div>

        )
    }
}    

export default MyEvents; 