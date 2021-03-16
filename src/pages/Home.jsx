import React, { Component } from 'react'; 

import { Button } from "@material-ui/core"; 

import { SignUp } from '../component/index'; 

import APItest from '../component/APItest'; 



class Home extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            showDrawer: false
        }

        this.showDrawer = this.showDrawer.bind(this); 
        this.closeDrawer = this.closeDrawer.bind(this); 
    }

    showDrawer = () => { 
        this.setState({ 
            showDrawer: true
        })
    }

    closeDrawer = () => { 
        this.setState({ 
            showDrawer: false
        })
    }

    

    render() {

        return(
            <div className="standard">
                <h1>This is home. A placeholder site. </h1>
                <Button
                    onClick={this.showDrawer}
                >
                    Drawer Opener Hii
                </Button> 

                <SignUp /> 

                <APItest />
            </div>
        )
    }

}

export default Home; 