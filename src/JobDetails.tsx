import React from 'react';
import { Grid, Container } from '@mui/material';

const JobDetails: React.FC<{}> = ({}) => {
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div>Back to Home</div>
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
