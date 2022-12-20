import React from 'react';
import { Grid, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const JobDetails: React.FC<{}> = ({}) => {
  const {
    state: { company_name },
  } = useLocation();
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div>Back to Home</div>
            <div>{company_name} bab </div>
            <div>How to apply</div>
          </Grid>
          <Grid item xs={12} md={8}>
            Job details
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default JobDetails;
