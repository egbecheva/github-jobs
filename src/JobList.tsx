import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';  
import { useQueryClient, useQuery } from '@tanstack/react-query'

const fetchJobs = async () => {
  const response = await fetch("https://remotive.com/api/remote-jobs")
  return response.json()
}

function JobList() {

  interface SingleJob {
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
  const { data, status } = useQuery(["jobs"], fetchJobs);
  console.log(data)

  const [jobList, setJobList] = useState(Array<SingleJob>)
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNexPage] = useState(currentPage+1)
  const [prevPage, setPrevPage] = useState(currentPage-1)
  
  const NUMBER_OF_REQUESTS_PER_PAGE:number = 10
  const NUMBER_OF_PAGES:number = jobList.length/NUMBER_OF_REQUESTS_PER_PAGE

  useEffect(()=>{
    fetchJobs()
  },[])
  


  return (
    <div>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && data.jobs?.map((job:SingleJob,id:number)=>

        <div key={id} style={{margin:"2px"}}>
          <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={job.company_logo}
          alt="Live from space album cover"
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {job.company_name}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Chip label={job.job_type} variant="outlined" />
         
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'right', pl: 1, pb: 1 }}>
          <div>{job.publication_date}</div>
          <div>{job.candidate_required_location}</div>
        </Box>
      </Box>

     
    </Card>
        </div>
      )}
      
      
    </div>
  );
}

export default JobList;
