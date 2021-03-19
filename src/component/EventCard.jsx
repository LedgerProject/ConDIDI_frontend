import React, { Component } from 'react'; 
import { Card, CardMedia, CardHeader, IconButton, CardActions, CardContent, CardActionArea } from '@material-ui/core'; 
import { IconAvatar } from '../media'; 
import styled from 'styled-components'; 

const StyledCard = styled(Card)`
    width: 380px;
    height: 448px;
    margin: 40px 0 -30px 25px;
    padding: 30px 30px 30px 29px;
    border-radius: 12px;
    background-color: $purewhite;
`

const StyledCardMedia = styled(CardMedia)`
    width: 320px;
    height: 180px;
    margin: 30px 30px 0x 30px;
    padding: 70px 50px 30px 10px; 
    border-radius: 8px;
`
const EventTitle = styled(CardHeader)`
    width: 320px;
    height: 30px;
    margin: 0 0 10px;
    font-family: Roboto;
    font-size: 22px;
    font-weight: bold;
    color: $greyThree;
`

class EventCard extends Component {

    constructor(props) {
        super(props); 
            
            this.state = {
                token: '', 
            }
    }

    componentDidMount = async () =>  {
        this.setState({
            token: await this.props.token
        })
    }

    render() {


        const { title, subheader, image, id} = this.props; 

        return(
            <div>
                    <StyledCard> 
                        <CardActionArea
                            href={"calendar/event/"+id}
                            disableRipple
                        >
                            <StyledCardMedia image={image}/> 
                            <EventTitle 
                                title={title} 
                                subheader={subheader}
                            >
                            </EventTitle>
                            <CardContent>
                                <CardActions disableSpacing>
                                    <IconButton>
                                        <IconAvatar />   
                                    </IconButton>
                                </CardActions>
                            </CardContent>
                        </CardActionArea>                                   
                    </StyledCard>
            </div>
        )
    }

}

export default EventCard; 