import React, { Component } from 'react'; 
import { DataGrid } from '@material-ui/data-grid'; 
import { data } from '../config';  

import { Columns } from '../media/files/EventsTable'; 


class AdminEvents extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            success: 'no', 
            columns: Columns, 
            rows: [], 
            rowsLength: '', 
        }

        this.loadData = this.loadData.bind(this); 
        this.getToken = this.getToken.bind(this); 
        this.getEvents = this.getEvents.bind(this); 
        this.makeRows = this.makeRows.bind(this);  
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await this.getToken();
        await this.getEvents(); 
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
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
        console.log(arr)
        this.setState({
            rows: arr
        })
    } 

    render() {

        return(
            <div className="admin">
                <h2>Admin Events</h2>
                <div className='table'>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={30} checkboxSelection />
                </div>
            </div>
        )
    }

}

export default AdminEvents; 