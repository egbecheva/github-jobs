import React, { useEffect } from 'react';
import {  useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { styled } from '@mui/material/styles';

import './style.css';
import { Grid, Paper, Box } from '@mui/material';
import LocationSearchBar from "./LocationSearchBar"
import MainSearchBar from "./MainSearchBar"
import FullTimeCheckBox from "./FullTimeCheckBox"
import JobList from "./JobList"
import PreDefinedCountries from "./PreDefinedCountries"




const queryClient = new QueryClient()

function App() {
  

  let initialCheckBoxState = sessionStorage.getItem('onlyFullTimeJobsVisible')
  const [onlyFullTimeJobsVisible, setOnlyFullTimeJobsVisible] = useState<string>(initialCheckBoxState || "false")
  const [country, setCountry] = useState<string>("")
  const [mainSearchBarQuery, setMainSearchBarQuery] = useState<string>("")
  const [locationSearchBarQuery, setLocationSearchBarQuery] = useState<string>("")
  const [isSearchButtonClicked,setIsSearchButtonClicked]=useState<boolean>(false)


 useEffect(()=>{
  //reset the state of the Search button in order to be able to perform subsequent searches
    setIsSearchButtonClicked(false)
 },[mainSearchBarQuery])



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

  const handleSearchButtonClick = () => {
    if(mainSearchBarQuery){
      setIsSearchButtonClicked(true)
    }
  }
 

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div>
          <Box mx={20}>
          <h1 className="gh-jobs-title" style={{fontSize:"24px"}}><strong>Remote</strong> Jobs</h1>
            <Grid  container rowSpacing={2}>
              <Grid item xs={12} md={12}>
                <Paper className="gh-jobs-header">
                  <MainSearchBar 
                  handleMainSearchBar={handleMainSearchBar}
                  handleSearchButtonClick={handleSearchButtonClick}
                  />
                </Paper>
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
              <Grid item xs={12} md={8} >
                <Paper style={{backgroundColor:"#F6F7FB", boxShadow:'none'}}><JobList
                  mainSearchBarQuery={mainSearchBarQuery} 
                  country={country} 
                  onlyFullTimeJobsVisible={onlyFullTimeJobsVisible} 
                  locationSearchBarQuery={locationSearchBarQuery}
                  isSearchButtonClicked={isSearchButtonClicked}
                  setIsSearchButtonClicked={setIsSearchButtonClicked}
                />
                  </Paper>
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
