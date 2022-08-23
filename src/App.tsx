import React from 'react';
import './style.css';
import { Grid, Paper, Box, TextField  } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from "./SearchBar"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div>
      <Box m={10} pt={7}>
        <Grid  container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={12}>
            <Item className="gh-jobs-header">
              <SearchBar/>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>3</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
