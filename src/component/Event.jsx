import React, { Component } from 'react'; 
import { Grid, Card, CardMedia, Box, CardHeader, IconButton, CardActions, CardContent, CardActionArea } from '@material-ui/core'; 
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

const StyledBox = styled(Box)`
    width: 48px;
    height: 48px;
    margin: 0px 20px 0px 0px; 
    border-radius: 15px;
    border: solid 2px #494747;
`

const Day = styled.p`
    width: 15px;
    height: 30px;
    font-weight: bold; 
    font-size: 30px; 
    font-family: Roboto; 
    text-align: center; 
    color: $greyThree; 
    margin: 6px 0px 0px 6px; 
`

const Weekday = styled.p`
    font-family: Roboto;
    font-weight: bold;
    font-size: 16px;
    color: $greyThree; 
    margin: 30px 0px 0px 0px; 
`

const Month = styled.p`
    font-family: Roboto;
    font-size: 14px;
    color: $greyTwo; 
    margin: 0px 10px 30px 0px;  
`

const Year = styled.p`
    width: 15px;
    height: 30px;
    font-weight: bold; 
    font-size: 30px; 
    font-family: Roboto; 
    text-align: center; 
    color: $greyThree; 
    margin: 6px 0px 0px 6px; 
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


class Event extends Component {

    render() {

        const {eventID, image, day, weekday, month, year, title, subheader} = this.props; 

        return(
            <div>
                    <StyledCard> 
                        <CardActionArea
                            href={'/event/'+eventID}
                            disableRipple
                        >
                            <StyledCardMedia image={image}/> 

                            <Grid 
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            > 
                                <StyledBox>
                                    <Day>{day}</Day>
                                </StyledBox>
                                <Grid item> 
                                    <Weekday>{weekday}</Weekday>
                                    <Month>{month}</Month>
                                    <Year>{year}</Year>
                                </Grid>
                            </Grid>
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

export default Event; 