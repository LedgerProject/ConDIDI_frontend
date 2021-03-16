import React, { Component } from 'react';


class CreateEvent extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventName: '',
            type: '',
            subject: '',
            venueInformation: '',
            address: '',
            url: '',
            organiserInstitution: '',
            contactPersonName: '',
            contactPersonEmail: '',
            submissionDeadline: '',
            registrationDeadline: '',
            date: '',
            organiserUserId: '',  
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
        this.sendEventData = this.sendEventData.bind(this); 
        this.makeJson = this.makeJson.bind(this); 
    }

    makeJson = () => {
        return ({
                    "name": this.state.eventName, 
                    "type": this.state.type,
                    "subject": this.state.subject,
                    "venueInformation": this.state.venueInformation,
                    "address": this.state.address,
                    "url": this.state.url,
                    "organiserInstitution": this.state.organiserInstitution,
                    "contactPersonName": this.state.contactPersonName,
                    "contactPersonEmail": this.state.contactPersonEmail,
                    "submissionDeadline": this.state.submissionDeadline,
                    "registrationDeadline": this.state.registrationDeadline,
                    "date": this.state.date,
                    "organiserUserId": this.state.organiserUserId
                    })
        }    

    sendEventData = async() => {

        const eventDict = this.makeJson(); 

        try {

            await fetch('http://localhost:8080/api/add_event', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: "Oasdx1QpuDAR1NEj3pFlus_goiDonZaPvshB4UMS-4zgPjmc", 
                    eventdict: eventDict,                      
                })
            })
            .then((response) => { 
                return response.json() 
            })
            .then((json) => { 
                return console.log(json); 
            });

        } catch (error) {
            console.log(error); 
        }

    }

    handleChange(event) {
        const target = event.target; 
        const value = target.value; 
        const name = target.name; 

        this.setState({
            [name]: value, 
        }); 
    }

    handleSubmit(event) {
        event.preventDefault(); 
        this.sendEventData(); 
    }

    render(){
        return(

            <div className="standard">
                <p>Create a new event here.  </p>
                <span/> 
                <form onSubmit={this.handleSubmit}> 
                    <label>
                        Event Name: 
                        <input 
                            name="eventName"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Event Type: 
                        <input 
                            name="type"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Venue Information: 
                        <input 
                            name="venueInformation"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Event Address: 
                        <input 
                            name="address"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Event URL: 
                        <input 
                            name="url"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label>
                    
                    <br/> 

                    <label>
                        Organiser Institution: 
                        <input 
                            name="organiserInstitution"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Contact Person Name: 
                        <input 
                            name="contactPersonName"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Contact Person Email: 
                        <input 
                            name="contactPersonEmail"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Submission Deadline: 
                        <input 
                            name="submissionDeadline"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Registration Deadline: 
                        <input 
                            name="registrationDeadline"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 

                    <br/> 

                    <label>
                        Date: 
                        <input 
                            name="date"
                            type="text" 
                            onChange={this.handleChange} /> 
                    </label> 


                    <input type="submit" value="Submit" /> 
                    
                </form>

                <br /> 

                Here is the state information: 

                Event Name: {this.state.eventName}
                <br /> 
                Event Type: {this.state.eventType}
                <br /> 
                Venue Information: {this.state.venueInformation}
                <br /> 
                Event Address: {this.state.address}
                <br /> 
                Event URL: {this.state.url}
                <br /> 
                Organiser Institution: {this.state.organiserInstitution}
                <br /> 
                Contact Person Name: {this.state.contactPersonName}
                <br /> 
                Contact Person Email: {this.state.contactPersonEmail}
                <br /> 
                Submission Deadline: {this.state.submissionDeadline}
                <br /> 
                Registration Deadline: {this.state.registrationDeadline}
                <br /> 
                Date: {this.state.date}
            </div>

        )
    }
}    

export default CreateEvent; 