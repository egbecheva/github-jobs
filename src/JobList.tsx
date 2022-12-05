import React from 'react';
import {  useState, useEffect } from 'react';
import  usePagination  from './Pagination'

import Box from '@mui/material/Box';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';  
import { useQuery,useQueryClient } from '@tanstack/react-query'
import PaginationRounded from './PaginationRounded'






const JobList: React.FC<{onlyFullTimeJobsVisible:string,country:string,mainSearchBarQuery:string,locationSearchBarQuery:string}> 
= ({onlyFullTimeJobsVisible,country,mainSearchBarQuery,locationSearchBarQuery}) => {

  
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
  const queryClient = useQueryClient()
  let [page, setPage] = useState(1);
  const PER_PAGE:number = 10;
  
  const fetchJobs = async () => {
    const response = await fetch("https://remotive.com/api/remote-jobs")
    return response.json()
  }
  const { data, status } = useQuery(["jobs"], fetchJobs );
  const _DATA = usePagination(data?.jobs,PER_PAGE,country,mainSearchBarQuery,onlyFullTimeJobsVisible,locationSearchBarQuery);

  useEffect(()=>{
    setPage(1);
    _DATA?.jump(1);
  },[country,onlyFullTimeJobsVisible,mainSearchBarQuery,locationSearchBarQuery])
  
console.log(data?.jobs)
  const handleChange = (e:any, p:any) => {
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
    const {
      id, 
      company_logo,
      title,
      company_name,
      publication_date,
      candidate_required_location,
      job_type
    } = props.jobDetails;
    
    return <div key={id} style={{ margin: "2px" }}>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={company_logo}
          alt="Live from space album cover" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {company_name}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Chip label={job_type} variant="outlined" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'right', pl: 1, pb: 1 }}>
            <div>{publication_date}</div>
            <div>{candidate_required_location}</div>
          </Box>
        </Box>
      </Card>
    </div>;
  }
}

export default JobList;
