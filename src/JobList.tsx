import React from 'react';
import {  useState, useEffect } from 'react';
import  usePagination  from './Pagination'

import Box from '@mui/material/Box';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';  
import { useQuery,useQueryClient } from '@tanstack/react-query'
import PaginationRounded from './PaginationRounded'
import { ChangeEvent } from "react"






const JobList: React.FC<{
  onlyFullTimeJobsVisible:string,
  country:string,mainSearchBarQuery:string,
  locationSearchBarQuery:string,
  isSearchButtonClicked:boolean,
  setIsSearchButtonClicked:React.Dispatch<React.SetStateAction<boolean>>,
}> 
= ({
  onlyFullTimeJobsVisible,
  country,
  mainSearchBarQuery,
  locationSearchBarQuery,
  isSearchButtonClicked,
  setIsSearchButtonClicked,
}) => {

  
  type SingleJob = {
    candidate_required_location: string;
    category: string;
    company_logo: string;
    company_name: string;
    description: string;
    id: number;
    job_type: string; 
    publication_date: string; 
    salary:string;
    tags:string[];
    title:string;
    url:string
  }

  type JobTypes = {
    contract:string;
    part_time:string;
    full_time:string;
    freelance: string;
    internship:string;
    other:string
  }
  


  const queryClient = useQueryClient()
  let [page, setPage] = useState(1);
  const PER_PAGE:number = 10;
  
  const fetchJobs = async () => {
    const response = await fetch("https://remotive.com/api/remote-jobs")
    return response.json()
  }
  const { data, status } = useQuery(["jobs"], fetchJobs );
  const _DATA = usePagination(
                  data?.jobs, 
                  PER_PAGE, 
                  isSearchButtonClicked, 
                  country,
                  mainSearchBarQuery,
                  onlyFullTimeJobsVisible,
                  locationSearchBarQuery
                  );

  useEffect(()=>{
    setPage(1);
    _DATA?.jump(1);
  },[country,onlyFullTimeJobsVisible,mainSearchBarQuery,locationSearchBarQuery])
  
  const handleChange = (_:any, p:number) => {
    setPage(p);
    _DATA?.jump(p)
  };
  const maxPages = _DATA?.maxPage


  let results = _DATA?.currentData() || [];

  
  return (
    <div>

      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && results.map((job:SingleJob) => 
        <JobCard jobDetails={job} />
      )}
      <PaginationRounded
        count={maxPages}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );

  interface OwnProps {
    jobDetails: SingleJob
  }

  function JobCard(props:OwnProps) {

    const job_contracts:any = {
      contract:"Contract",
      part_time:"Part time",
      full_time:"Full time",
      freelance: "Freelance",
      internship:"Internship",
      other:"Other"
    }

    const {
      id, 
      company_logo,
      title,
      company_name,
      publication_date,
      candidate_required_location,
      job_type
    } = props.jobDetails;

  
    
    return <div>

      <Card key={id} sx={{ display: 'flex', height: "114px", width: "790px", left: "531px", top: "280px", borderRadius: "4px", margin:'20px', boxShadow:'none'}}>
        <CardMedia
          component="img"
          sx={{ height: "90px", width: "90px", margin:"12px", borderRadius: "4px" }}
          image={company_logo}
          alt="Live from space album cover" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="subtitle1" align="left" style={{fontWeight: "bold", fontSize:'12px'}}>
              {company_name}
            </Typography>
            <Typography variant="h5" component="div" align="left" style={{fontSize: "18px"}}>
              {title}
            </Typography>
            <span>{publication_date}</span>
            <span>{candidate_required_location}</span>
              <span style={{ display: 'flex', alignItems: 'center'}}></span>
              <span>
                {job_type && <Chip style={{borderRadius:"5px", borderColor:"#334680"}} label={job_contracts[job_type]} variant="outlined" size="small"/>}
              </span>
          </CardContent>
        </Box>
      </Card>
    </div>;
  }
}

export default JobList;
