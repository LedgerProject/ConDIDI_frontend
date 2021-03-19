import React, { Component } from 'react'; 


class Admin extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
        }

        this.loadData = this.loadData.bind(this); 
        this.getToken = this.getToken.bind(this); 
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async() => {
        await this.getToken();
    }

    getToken = async() => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }


    render() {

        return(
            <div className="standard">
                <h1>This is the admin area. </h1>
                <button>
                    Check Participant in
                </button>
            </div>
            
        )
    }

}

export default Admin; 