import React from 'react';
import {  useState, useEffect, useCallback } from 'react';
import  usePagination  from './Pagination'

import Box from '@mui/material/Box';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';  
import { useQuery } from '@tanstack/react-query'
import PaginationRounded from './PaginationRounded'

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




  // const queryClient = useQueryClient()
  const { data, status } = useQuery(["jobs"], fetchJobs);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(data?.jobs?.length / PER_PAGE);
  const _DATA = usePagination(data?.jobs, PER_PAGE);

  const handleChange = (e:any, p:any) => {
    setPage(p);
    _DATA.jump(p);
  };
 


  return (
    <div>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && _DATA?.currentData()
      .map(({company_logo,title,company_name,publication_date,candidate_required_location,job_type}:SingleJob,id:number) => 
        <div key={id} style={{margin:"2px"}}>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={company_logo}
            alt="Live from space album cover"
          />
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
      </div>
      )}
      <PaginationRounded
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}

export default JobList;
