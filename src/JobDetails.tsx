import React from 'react';
import { Grid, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import PublicIcon from '@mui/icons-material/Public';
import { formatDistance } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const JobDetails: React.FC<{}> = ({}) => {
  const job_contracts: any = {
    contract: 'Contract',
    part_time: 'Part time',
    full_time: 'Full time',
    freelance: 'Freelance',
    internship: 'Internship',
    other: 'Other',
  };

  const {
    state: {
      company_name,
      job_description,
      job_title,
      job_location,
      logo,
      job_publication,
      job_type,
    },
  } = useLocation();

  function createMarkup(text: string) {
    return { __html: text };
  }

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={3}>
            <div>Back to Home</div>
            <div>{company_name} bab </div>
            <div>How to apply</div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className='chip_job_type'>
              <h2 className='job_title'>{job_title}</h2>
              <div>
                {job_type && (
                  <Chip
                    className='job_details_chip'
                    label={job_contracts[job_type]}
                    variant='outlined'
                    size='small'
                  />
                )}
              </div>
            </div>
            <span className='publication-time-wrapper'>
              <AccessTimeIcon
                style={{
                  fontSize: '12px',
                  color: 'grey',
                  marginRight: '2px',
                }}
              />

              {formatDistance(new Date(job_publication), new Date(), {
                addSuffix: true,
              })}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'space-between',
                marginTop: '10px',
              }}
            >
              <img src={logo} className='company_logo' alt='company_logo' />
              <div style={{ marginLeft: '5px' }}>
                <div>{company_name}</div>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'grey',
                  }}
                >
                  <PublicIcon
                    className='public-icon'
                    style={{
                      fontSize: '12px',
                      color: 'grey',
                      marginRight: '2px',
                    }}
                  />
                  {job_location}
                </span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={createMarkup(job_description)} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default JobDetails;
