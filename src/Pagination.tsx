import React, { useState, useRef,useEffect} from "react";
import {matchSorter} from 'match-sorter'

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


function usePagination(data:SingleJob[], itemsPerPage:number, country?:string | undefined, mainSearchBarQuery?:string | undefined,onlyFullTimeJobsVisible?:string) {
  
  const [currentPage, setCurrentPage] = useState<number>(1);

  let filteredJobsResults = data

  useEffect(()=>{
  },[filteredJobsResults,onlyFullTimeJobsVisible, country, mainSearchBarQuery])

  const mainSearchBarFilter = (keyWord:string,filteredJobsResults:SingleJob[]):SingleJob[]  => {
    return matchSorter(filteredJobsResults, keyWord.toString(), {keys: ['title',"company_name"]})
  }

  const countryFilter = (c:string):SingleJob[] => {
    return data?.filter((e:any) => e.candidate_required_location === c)
  }
  
  //Filtering of multiple user choices

  if(country) {
    filteredJobsResults=countryFilter(country)
  } 
  if (onlyFullTimeJobsVisible==='true') {
    filteredJobsResults = filteredJobsResults?.filter(({job_type}:SingleJob)=>job_type==="full_time")
  } 
  if(mainSearchBarQuery) {
    filteredJobsResults=(mainSearchBarFilter(mainSearchBarQuery,filteredJobsResults))
  } 

//End of filtering
  
  const maxPage = Math.ceil(filteredJobsResults?.length > itemsPerPage
  ? filteredJobsResults?.length / itemsPerPage
  : 1) ;
  
  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredJobsResults?.slice(begin, end);
  }

  const next = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  const prev = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  const jump = (page:number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage, filteredJobsResults };
}
export default usePagination