import React, { Component } from 'react'; 
import { Grid, Link } from '@material-ui/core'; 
import styled from 'styled-components'; 

const StyledGrid = styled(Grid)`
    height: 20px; 
    margin: 40px 60px 50px 50px; 
    padding: 20px 20px 20px 20px; 
    font-family: Roboto;
    font-size: 14px;
    color: #1e1f20;
`;

const Wrapper = styled.section`
  padding: 2em;
`;

const StyledLink = styled(Link)`
    color: #1e1f20;
    text-decoration: none;

    &:hover {
        color: #82c43c; 
        text-decoration: none;
    }
`;


class LinkList extends Component {

    

    render() {

        return(
            <Wrapper>

                <StyledGrid
                    container
                    direction='row'
                    justify='flex-start'
                    spacing={4}
                    alignItems='center'
                >
                    <Grid item>
                        <StyledLink>
                            Anytime   
                        </StyledLink>
                    </Grid>
                    
                    <Grid item>
                        <StyledLink>
                            Today   
                        </StyledLink>
                    </Grid>
                    <Grid item>
                        <StyledLink>
                            Tomorrow   
                        </StyledLink>
                    </Grid>
                    <Grid item>
                        <StyledLink>
                            This Week   
                        </StyledLink>
                    </Grid>
                    <Grid item>
                        <StyledLink>
                            This Month   
                        </StyledLink>
                    </Grid>

                </StyledGrid>

            </Wrapper>
        )
    }

}

export default LinkList; 