import React, { Component } from 'react'; 
import Image from '../component/Image'; 


class SingleEvent extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventid: '', 
            eventlist: '', 
        }

        this.getProps = this.getProps.bind(this); 
        this.getToken = this.getToken.bind(this); 
        console.log('window location')
        console.log(window.location.pathname.slice(7));
    }

    componentDidMount = async () => {
        
        this.getProps(); 
        this.getToken(); 
    }

    getProps = async () => {

        const id = window.location.pathname.slice(7)
        
        this.setState({
            eventlist: await this.props.eventlist, 
            eventid: id, 
        })

        this.getToken(); 
    }

    getToken = async () => {

        this.setState({
            token: await this.props.token, 
        })

        console.log(this.state.token)
    } 

    render() {

        return(
            <div className="single-event-page">

                {/* 
                <BackButton 
                    className="event-button" 
                    href="/calendar"
                    startIcon={<ArrowBackIos/>}
                >
                    Back
                </BackButton>

                */}

                <Image 
                    name="event-image" 
                    width="635" 
                    height="330"
                /> 

                <h1 
                    className="event-title"
                >
                    Ueberschrift
                </h1>

                <h2 
                    className="event-description-title"
                >
                    Event Description
                </h2>

                <p 
                    className="event-description"
                >
                    Following the traditions of the previous successful ICA3PP conferences held in Hangzhou, Brisbane, Singapore, Melbourne, Hong Kong and Beijing, the objective of ICA3PP 2008 is to bring together researchers and practitioners from academia, industry and governments to advance the theories and technologies in parallel and distributed computing. ICA3PP 2008 will be held on the island of Cyprus, with a focus on two broad areas of parallel and distributed computing, i.e., architectures, algorithms and networks, and systems and applications.
                </p>
                
                {/**
                {tagList.map((tag) => {
                    <Tag label={tag} /> 
                })}
                */}

            </div>
        )
    }

}

export default SingleEvent; 