import React, { Component } from 'react'; 



class Home extends Component {

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

    loadData = async () => {
        await this.getToken();
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }

    

    render() {

        return(
            <div className="standard">
                <h1>This is home</h1>
                <p>Home is where the code is. </p>
                <br /> 
                <p> Version 0.0.69</p>
            </div>
        )
    }

}

export default Home; 