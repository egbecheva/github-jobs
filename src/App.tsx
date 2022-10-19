import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { styled } from '@mui/material/styles';

import './style.css';
import { Grid, Paper, Box,InputBase } from '@mui/material';
import SearchBar from "./SearchBar"
import JobList from "./JobList"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PublicIcon from '@mui/icons-material/Public';



const queryClient = new QueryClient()
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Box mx={20}>
        <h1 className="gh-jobs-title"><strong>Remote</strong> Jobs</h1>
          <Grid  container rowSpacing={2}>
            <Grid item xs={12} md={12}>
              <Item className="gh-jobs-header">
                <SearchBar/>
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Full time" />
            </FormGroup>
            <div style={{color:"#B9BDCF",fontWeight:"bold",fontSize:"15px", marginBottom:"2px"}}>
              LOCATION
            </div>
            <Paper
              component="form"
              sx={{ p: '5px 5px', display: 'flex', alignItems: 'center', width: "60%", minHeight: "60px" }}
            >
              <PublicIcon sx={{ m: '4px 10px'}} style={{color:"#B9BDCF"}}/>
              <InputBase
                sx={{  flex: 2 }}
                placeholder="City, state, zip code or country"
              />
            </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Item ><JobList/></Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    <ReactQueryDevtools />
  </QueryClientProvider>
  );
}

export default App;
