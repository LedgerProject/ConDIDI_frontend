import React, { Component } from 'react'; 
import { DataGrid } from '@material-ui/data-grid'; 

import { Rows, Columns } from '../media/files/ParticipantsTable'; 

class AdminParticipants extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            rows: Rows, 
            columns: Columns
        }
    }

    

    render() {

        return(
            <div className="admin">
                <h2>Admin Participants</h2>
                <div className='table'>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        )
    }

}

export default AdminParticipants; 