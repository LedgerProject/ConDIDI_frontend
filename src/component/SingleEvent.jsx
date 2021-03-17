import React, { Component } from 'react'; 
import Image from '../component/Image'; 
import { Button, Accordion, AccordionDetails, AccordionSummary, styled} from "@material-ui/core"; 
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'; 
import { data } from '../config'; 

const BackButton = styled(Button) ({
    width: '100px'
})

class SingleEvent extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            token: '', 
            eventid: '', 
            eventlist: '', 
        }

        this.getProps = this.getProps.bind(this); 
    }

    componentDidMount = async () => {
        
        this.getProps(); 
    }

    getProps = async () => {
        
        this.setState({
            token: await this.props.token, 
            eventlist: await this.props.eventlist, 
            eventid: await this.props.eventid
        })

        console.log('token: ')
        console.log(this.state.token)

        console.log('eventlist: ')
        console.log(this.state.eventlist)

        console.log('eventid')
        console.log(this.state.eventid)
    }

    render() {

        const {eventlist, eventid, subject} = this.state; 

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
                    Following the traditions of the previous successful ICA3PP conferences held in Hangzhou, Brisbane, Singapore, Melbourne, Hong Kong and Beijing, the objective of ICA3PP 2008 is to bring together researchers and practitioners from academia, industry and governments to advance the theories and technologies in parallel and distributed computing. ICA3PP 2008 will be held on the island of Cyprus, with a focus on two broad areas of parallel and distributed computing, i.e., architectures, algorithms and networks, and systems and applications.</p>
                
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