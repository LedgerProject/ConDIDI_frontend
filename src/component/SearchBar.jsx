import React, { Component } from 'react'; 
import SearchIcon from '@material-ui/icons/Search'; 
import { Grid, TextField } from '@material-ui/core'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
    padding: 2em;
`;

const StyledGrid = styled(Grid)`
    height: 20;
    border-radius: 12px;
    background-color: #f7f7f7;
`

class SearchBar extends Component {

    render() {

        return(
            <Wrapper>
                <StyledGrid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <SearchIcon /> 
                    </Grid>
                    <Grid item>
                        <TextField id="event-search" label="Search by name..." /> 
                    </Grid>
                </StyledGrid>
            </Wrapper>
        )
    }

}

export default SearchBar; 