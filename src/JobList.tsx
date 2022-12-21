import React from 'react';
import { useState, useEffect } from 'react';
import usePagination from './Pagination';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import PublicIcon from '@mui/icons-material/Public';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PaginationRounded from './PaginationRounded';
import { formatDistance, subDays } from 'date-fns';
import { Link } from 'react-router-dom';

const JobList: React.FC<{
  onlyFullTimeJobsVisible: string;
  country: string;
  mainSearchBarQuery: string;
  locationSearchBarQuery: string;
  isSearchButtonClicked: boolean;
  setIsSearchButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
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
    salary: string;
    tags: string[];
    title: string;
    url: string;
  };

  type JobTypes = {
    contract: string;
    part_time: string;
    full_time: string;
    freelance: string;
    internship: string;
    other: string;
  };

  const queryClient = useQueryClient();
  let [page, setPage] = useState(1);
  const PER_PAGE: number = 10;

  const fetchJobs = async () => {
    const response = await fetch('https://remotive.com/api/remote-jobs');
    return response.json();
  };
  const { data, status } = useQuery(['jobs'], fetchJobs);
  const _DATA = usePagination(
    data?.jobs,
    PER_PAGE,
    isSearchButtonClicked,
    country,
    mainSearchBarQuery,
    onlyFullTimeJobsVisible,
    locationSearchBarQuery
  );

  useEffect(() => {
    setPage(1);
    _DATA?.jump(1);
  }, [
    country,
    onlyFullTimeJobsVisible,
    mainSearchBarQuery,
    locationSearchBarQuery,
  ]);

  const handleChange = (_: any, p: number) => {
    setPage(p);
    _DATA?.jump(p);
  };
  const maxPages = _DATA?.maxPage;

  let results = _DATA?.currentData() || [];
  return (
    <div>
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' &&
        results.map((job: SingleJob) => (
          <Link
            to={{
              pathname: `job-details/${job.id}`,
            }}
            state={{
              company_name: job.company_name,
            }}
          >
            <JobCard jobDetails={job} />
          </Link>
        ))}
      <PaginationRounded
        count={maxPages}
        size='large'
        page={page}
        variant='outlined'
        shape='rounded'
        onChange={handleChange}
      />
    </div>
  );

  interface OwnProps {
    jobDetails: SingleJob;
  }

  function JobCard(props: OwnProps) {
    const job_contracts: any = {
      contract: 'Contract',
      part_time: 'Part time',
      full_time: 'Full time',
      freelance: 'Freelance',
      internship: 'Internship',
      other: 'Other',
    };

    const {
      id,
      company_logo,
      title,
      company_name,
      publication_date,
      candidate_required_location,
      job_type,
    } = props.jobDetails;

    return (
      <CardActionArea>
        <div onClick={() => console.log(44)}>
          <Card
            key={id}
            style={{
              display: 'flex',
              borderRadius: '4px',
              fontFamily: 'Roboto',
              boxShadow: 'none',
              marginTop: '20px',
            }}
          >
            <CardMedia
              component='img'
              sx={{
                height: '90px',
                width: '90px',
                margin: '12px',
                borderRadius: '4px',
              }}
              image={company_logo}
            />
            <div className='job-card-content-wrapper'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: '12px',
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                >
                  {company_name}
                </div>
                <div style={{ fontSize: '18px' }}>{title}</div>
                <div>
                  {job_type && (
                    <Chip
                      style={{
                        borderRadius: '5px',
                        borderColor: '#334680',
                        marginTop: '6px',
                      }}
                      label={job_contracts[job_type]}
                      variant='outlined'
                      size='small'
                    />
                  )}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '12px',
                  gap: 40,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'grey',
                  }}
                >
                  <AccessTimeIcon
                    style={{
                      fontSize: '12px',
                      color: 'grey',
                      marginRight: '2px',
                    }}
                  />
                  {candidate_required_location}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'grey',
                  }}
                >
                  <PublicIcon
                    style={{
                      fontSize: '12px',
                      color: 'grey',
                      marginRight: '2px',
                    }}
                  />
                  {formatDistance(new Date(publication_date), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </CardActionArea>
    );
  }
};

export default JobList;
