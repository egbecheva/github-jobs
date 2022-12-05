import React from 'react';
import {  useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { styled } from '@mui/material/styles';

import './style.css';
import { Grid, Paper, Box,InputBase } from '@mui/material';
import LocationSearchBar from "./LocationSearchBar"
import MainSearchBar from "./MainSearchBar"
import FullTimeCheckBox from "./FullTimeCheckBox"
import JobList from "./JobList"
import PreDefinedCountries from "./PreDefinedCountries"

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
  
  let initialCheckBoxState = sessionStorage.getItem('onlyFullTimeJobsVisible')
  const [onlyFullTimeJobsVisible, setOnlyFullTimeJobsVisible] = useState<string>(initialCheckBoxState || "false")
  const [country, setCountry] = useState<string>("")
  const [mainSearchBarQuery, setMainSearchBarQuery] = useState<string>("")
  const [locationSearchBarQuery, setLocationSearchBarQuery] = useState<string>("")

  const handleFullTimeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
      sessionStorage.setItem('onlyFullTimeJobsVisible', event.target.checked.toString())
      setOnlyFullTimeJobsVisible(event.target.checked.toString())
  }
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleMainSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainSearchBarQuery(event.target.value);
  };

  const handleLocationSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationSearchBarQuery(event.target.value);
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div>
          <Box mx={20}>
          <h1 className="gh-jobs-title"><strong>Remote</strong> Jobs</h1>
            <Grid  container rowSpacing={2}>
              <Grid item xs={12} md={12}>
                <Item className="gh-jobs-header">
                  <MainSearchBar handleMainSearchBar={handleMainSearchBar}/>
                </Item>
              </Grid>
              <Grid item xs={12} md={4}>
                <div>
                  <FullTimeCheckBox handleFullTimeCheckBox={handleFullTimeCheckBox} onlyFullTimeJobsVisible={onlyFullTimeJobsVisible}/>
              </div>
              <div style={{color:"#B9BDCF",fontWeight:"bold",fontSize:"15px", marginBottom:"2px"}}>
                LOCATION
              </div>
                <LocationSearchBar handleLocationSearchBar={handleLocationSearchBar}/>
                  <div>
                    <PreDefinedCountries handleCountryChange={handleCountryChange}/>
                  </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <Item><JobList
                  mainSearchBarQuery={mainSearchBarQuery} country={country} onlyFullTimeJobsVisible={onlyFullTimeJobsVisible} locationSearchBarQuery={locationSearchBarQuery}/></Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
  );
}

export default App;
