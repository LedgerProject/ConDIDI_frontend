import React, { Component } from 'react'; 


import { Grid } from "@material-ui/core"
import { SideThing, SingleEvent } from '../component/index'



class SingleEventPage extends Component {

    render() {

        return(

            <div className="single-page">
                <Grid container spacing={2}>
                    <Grid item xs>
                        <SingleEvent /> 
                    </Grid>
                    <Grid item xs>
                        <SideThing/>
                    </Grid>
                </Grid>
            </div>           
        )
    }

}

export default SingleEventPage; 