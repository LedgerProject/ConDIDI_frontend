import React, { Component } from 'react';
import {Button} from '@material-ui/core'; 

class APItest extends Component {

    constructor(props) {
        super(props); 

        this.state = ({
            userid: '',
            id: '',
            title: '', 
            completed: '',  
            titlePost: 'titlepost', 
            bodyPost: 'bodypost', 
            userIdPost: 1, 
        })

        this.fetchData = this.fetchData.bind(this); 
        this.sendData = this.sendData.bind(this)
    }

    sendDataArrango  = async()  =>  {


        try {

            await fetch('http://localhost:8080/api/create_user', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'test@condidi.fr', 
                    name: 'testuser', 
                    password: '12345'
                })
            })
            .then((response) => { return response.json() }) 
            .then((json) => { return console.log(json)});

        } catch (error) {
            console.log(error); 
        }

    }

    sendData = () => {

        const titlePost = this.state.titlePost; 
        const bodyPost = this.state.bodyPost; 
        const userIdPost = this.state.userIdPost

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', 
            body: JSON.stringify({
                title: {titlePost}, 
                body: {bodyPost}, 
                userId: {userIdPost}, 
            }), 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

    }

    fetchData = () => {

        
        
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then( json => {
                console.log(json); 
                console.log(json.id); 
                this.setState({
                    userid: json.userid,
                    id: json.id,
                    title: json.title, 
                    completed: json.completed, 
                })
            });
    }


    render(){
        return(

            <div className="APItest">

                <Button onClick={this.fetchData}>Fetch Data</Button>

                <p>This title: {this.state.title}</p>

                <Button onClick={this.sendData}>Send Data</Button>

                <span/>

                <Button onClick={this.sendDataArrango}>Arrango</Button> 

            </div>

        )
    }
}    

export default APItest; 