import React, { Component } from 'react'; 
import { data } from '../config'; 
import { Grid } from "@material-ui/core"
import { SingleEventDetails, SingleEvent } from '../component/index'



class SingleEventPage extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventlist: [], 
            id: '', 
        }

        this.getData = this.getData.bind(this); 
        this.setEventList = this.setEventList.bind(this); 

    }

    componentDidMount = async () => {
        this.setState({
            token: await this.props.token, 
            id: this.props.match.params.id, 
        })
        this.getData(); 
    }

    getData = async () => {

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
                this.setEventList(json); 
                return console.log(json); 
            });
        } catch (error) {
            console.log(error); 
        }

    }

    setEventList = async (json) =>  {
        try {
            this.setState({
                eventlist: await json.eventlist,  
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    render() {

        return(

            <div className="single-page">
                <Grid container spacing={2}>
                    <Grid item xs>
                        <SingleEvent token={this.state.token} id={this.state.id} eventlist={this.state.eventlist}/> 
                    </Grid>
                    <Grid item xs>
                        <SingleEventDetails token={this.state.token} id={this.state.id}/>
                    </Grid>
                </Grid>
            </div>           
        )
    }

}

export default SingleEventPage; 